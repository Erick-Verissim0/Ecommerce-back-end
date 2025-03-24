import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/users';
import { UsersRepository } from 'src/domain/repository/users/users.interface';
import { Repository } from 'typeorm';

@Injectable()
export class PgUsersRepository implements UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userData: Partial<User>): Promise<User | null> {
    const user = this.userRepository.create(userData);

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create user: ${error.message}`,
      );
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getAllUsers(): Promise<User[] | null> {
    return await this.userRepository.find({
      where: { deleted_at: null },
    });
  }


  async getOneUser(id: number): Promise<Partial<User> | null> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to get user: ${error.message}`,
      );
    }
  }

  async updateUsers(
    id: number,
    updateData: Partial<User>,
  ): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      await this.userRepository.update(id, updateData);
      return this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update user: ${error.message}`,
      );
    }
  }

  async deleteUser(id: number): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      user.deleted_at = new Date();
      await this.userRepository.save(user);

      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete user: ${error.message}`,
      );
    }
  }
}
