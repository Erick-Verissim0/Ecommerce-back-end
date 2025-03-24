import { Client } from 'src/domain/entities/clients';
import { GetAllClientsInterface } from 'src/presentation/interface/clients/get_all_clients.interface';
import { PostClientsInterface } from 'src/presentation/interface/clients/post_clients.interface';

export interface ClientsRepository {
  postClient(clientData: Partial<Client>): Promise<PostClientsInterface | null>;
  getAllClient(): Promise<GetAllClientsInterface[] | []>;
}

export const ClientsRepository = Symbol('ClientsRepository');
