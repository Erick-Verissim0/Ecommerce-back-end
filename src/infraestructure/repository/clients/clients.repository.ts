import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/domain/entities/clients';
import { ClientsRepository } from 'src/domain/repository/clients/clients.interface';
import { Repository } from 'typeorm';

@Injectable()
export class PgClientsRepository implements ClientsRepository {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async postClient(clientData: Partial<Client>): Promise<Client | null> {
    const client = this.clientRepository.create(clientData);

    try {
      return await this.clientRepository.save(client);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create client: ${error.message}`,
      );
    }
  }
}
