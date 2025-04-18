import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/domain/entities/clients';
import {
  getClientRepositoryHelper,
  getClientsRepositoryHelper,
} from 'src/infraestructure/helpers/get_client_helper';
import { ClientsRepository } from 'src/domain/repository/clients/clients.interface';
import { DeleteClientsInterface } from 'src/presentation/interface/clients/delete_client.interface';
import { GetClientsInterface } from 'src/presentation/interface/clients/get_clients.interface';
import { PostClientsInterface } from 'src/presentation/interface/clients/post_clients.interface';
import { Repository } from 'typeorm';
import { ClientModel } from 'src/infraestructure/config/typeorm/models/clients.typeorm';
import { UserModel } from 'src/infraestructure/config/typeorm/models/users.typeorm.';

@Injectable()
export class PgClientsRepository implements ClientsRepository {
  constructor(
    @InjectRepository(ClientModel)
    private readonly clientRepository: Repository<ClientModel>,
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
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

  async updateClient(
    id: number,
    clientData: Partial<ClientModel> & { user_id: number },
  ): Promise<Client | null> {
    const client = await this.clientRepository.findOne({ where: { id } });

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    const user = await this.userRepository.findOne({
      where: { id: clientData.user_id },
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    client.user = user;
    Object.assign(client, clientData);
    client.updated_at = new Date();

    try {
      return await this.clientRepository.save(client);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update client: ${error.message}`,
      );
    }
  }

  async deleteClient(id: number): Promise<DeleteClientsInterface | null> {
    const client = await this.clientRepository.findOne({ where: { id } });

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    client.status = false;
    client.deleted_at = new Date();

    try {
      const updatedClient = await this.clientRepository.save(client);
      return {
        id: updatedClient.id,
        status: updatedClient.status,
        deleted_at: updatedClient.deleted_at,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete client: ${error.message}`,
      );
    }
  }
}
