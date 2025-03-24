import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from 'src/domain/repository/users/users.interface';
import { compareSync } from 'bcrypt';
import { AuthService } from 'src/infraestructure/services/auth.service';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(email: string, password: string): Promise<{ token: string }> {
    try {
      const user = await this.usersRepository.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('User not found!');
      }

      if (user.deleted_at) {
        throw new InternalServerErrorException('User is deleted!');
      }

      const isPasswordValid = compareSync(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const token = this.authService.generateToken({
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
      });

      return { token };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to login user: ${error.message}`,
      );
    }
  }
}
