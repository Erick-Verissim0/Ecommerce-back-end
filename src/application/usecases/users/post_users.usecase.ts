import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersRepository } from 'src/domain/repository/users/users.interface';
import { AuthService } from 'src/infraestructure/services/auth.service';
import { UsersInterface } from 'src/presentation/interface/users/create_users.interface';
import * as bcrypt from 'bcrypt';

interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  type: 'admin' | 'client';
}

@Injectable()
export class PostUsersUseCase {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(
    userData: CreateUserDto,
  ): Promise<{ user: UsersInterface; token: string } | null> {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const user = await this.usersRepository.createUser({
        ...userData,
        password: hashedPassword,
      });

      if (!user) {
        throw new Error('User not found!');
      }

      const token = this.authService.generateToken({
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
      });

      return { user, token };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create user ${error.message}`,
      );
    }
  }
}
