import { Client } from 'src/domain/entities/clients';
import { DeleteClientsInterface } from 'src/presentation/interface/clients/delete_client.interface';
import { GetClientsInterface } from 'src/presentation/interface/clients/get_clients.interface';
import { PostClientsInterface } from 'src/presentation/interface/clients/post_clients.interface';

export interface ClientsRepository {
  postClient(clientData: Partial<Client>): Promise<PostClientsInterface | null>;
  getAllClient(): Promise<GetClientsInterface[] | []>;
  getOneClient(id: number): Promise<GetClientsInterface | null>;
  updateClient(
    id: number,
    clientData: Partial<Client> & { user_id?: number },
  ): Promise<Client | null>;
  deleteClient(id: number): Promise<DeleteClientsInterface | null>;
}

export const ClientsRepository = Symbol('ClientsRepository');
