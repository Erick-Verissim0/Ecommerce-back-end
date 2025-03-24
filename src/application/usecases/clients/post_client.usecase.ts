import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientsRepository } from 'src/domain/repository/clients/clients.interface';
import { Client } from 'src/domain/entities/clients';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/users';

@Injectable()
export class PostClientsUseCase {
  constructor(
    @Inject(ClientsRepository)
    private readonly clientsRepository: ClientsRepository,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async execute(
    clientData: Partial<Client> & { user_id: number },
  ): Promise<Client | null> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: clientData.user_id },
      });

      if (!user) {
        throw new InternalServerErrorException('User not found!');
      }

      const client = await this.clientsRepository.postClient({
        ...clientData,
        user,
      });

      if (!client) {
        throw new Error('Client not found!');
      }

      return client;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create client: ${error.message}`,
      );
    }
  }
}
