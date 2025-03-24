import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/domain/entities/clients';
import { getClientsRepositoryHelper } from 'src/domain/helper/get_client_helper';
import { ClientsRepository } from 'src/domain/repository/clients/clients.interface';
import { GetAllClientsInterface } from 'src/presentation/interface/clients/get_all_clients.interface';
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

  async getAllClient(): Promise<GetAllClientsInterface[] | []> {
    try {
      const clients = await this.clientRepository.find({
        where: { status: true },
        relations: ['user'],
      });

      return getClientsRepositoryHelper(clients);
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao buscar clientes: ${error.message}`,
      );
    }
  }
}
