import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/domain/entities/users';
import { UsersRepository } from 'src/domain/repository/users/users.interface';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(id: number): Promise<User | null> {
    try {
      const user = await this.usersRepository.getOneUser(id);
      if (!user) {
        throw new InternalServerErrorException('User not found!');
      }

      return await this.usersRepository.deleteUser(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete user: ${error.message}`,
      );
    }
  }
}
