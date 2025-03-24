import { Client } from 'src/domain/entities/clients';
import { GetClientsInterface } from 'src/presentation/interface/clients/get_clients.interface';
import { PostClientsInterface } from 'src/presentation/interface/clients/post_clients.interface';

export interface ClientsRepository {
  postClient(clientData: Partial<Client>): Promise<PostClientsInterface | null>;
  getAllClient(): Promise<GetClientsInterface[] | []>;
  getOneClient(id: number): Promise<GetClientsInterface | null>;
}

export const ClientsRepository = Symbol('ClientsRepository');
