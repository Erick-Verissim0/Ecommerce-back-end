import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/domain/entities/clients';
import {
  getClientRepositoryHelper,
  getClientsRepositoryHelper,
} from 'src/domain/helper/get_client_helper';
import { ClientsRepository } from 'src/domain/repository/clients/clients.interface';
import { GetClientsInterface } from 'src/presentation/interface/clients/get_clients.interface';
import { PostClientsInterface } from 'src/presentation/interface/clients/post_clients.interface';
import { Repository } from 'typeorm';

@Injectable()
export class PgClientsRepository implements ClientsRepository {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async postClient(
    clientData: Partial<Client>,
  ): Promise<PostClientsInterface | null> {
    const client = this.clientRepository.create(clientData);

    try {
      return await this.clientRepository.save(client);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create client: ${error.message}`,
      );
    }
  }

  async getAllClient(): Promise<GetClientsInterface[] | []> {
    try {
      const clients = await this.clientRepository.find({
        where: { status: true },
        relations: ['user'],
      });

      return getClientsRepositoryHelper(clients);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error in get clients: ${error.message}`,
      );
    }
  }

  async getOneClient(id: number): Promise<GetClientsInterface | null> {
    try {
      const client = await this.clientRepository.findOne({
        where: { id, status: true },
        relations: ['user'],
      });

      return getClientRepositoryHelper(client);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error in get client: ${error.message}`,
      );
    }
  }
}
