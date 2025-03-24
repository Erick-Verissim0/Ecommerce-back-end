import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersRepository } from 'src/domain/repository/users/users.interface';
import { User } from 'src/domain/entities/users';

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(): Promise<User[]> {
    try {
      const users = await this.usersRepository.getAllUsers();

      return users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
        deleted_at: user.deleted_at || null,
      }));
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to load users: ${error.message}`,
      );
    }
  }
}
