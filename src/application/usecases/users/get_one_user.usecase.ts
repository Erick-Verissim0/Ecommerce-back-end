import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/domain/entities/users';
import { UsersRepository } from 'src/domain/repository/users/users.interface';

@Injectable()
export class GetOneUsesUseCase {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(id: number): Promise<Partial<User> | null> {
    try {
      const user = await this.usersRepository.getOneUser(id);
      if (!user) {
        throw new InternalServerErrorException('User not found!');
      }

      return await this.usersRepository.getOneUser(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to view user: ${error.message}`,
      );
    }
  }
}
