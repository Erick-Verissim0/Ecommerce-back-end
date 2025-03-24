import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/domain/entities/users';
import { UsersRepository } from 'src/domain/repository/users/users.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUsersUseCase {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(id: number, updateData: Partial<User>): Promise<User | null> {
    try {
      const user = await this.usersRepository.getOneUser(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (user.deleted_at) {
        throw new InternalServerErrorException(
          `Cannot update user with id ${id} because it has been deleted`,
        );
      }

      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }

      return await this.usersRepository.updateUsers(id, updateData);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update user: ${error.message}`,
      );
    }
  }
}
