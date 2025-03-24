import { Client } from 'src/domain/entities/clients';

export interface ClientsRepository {
  postClient(clientData: Partial<Client>): Promise<Client | null>;
}

export const ClientsRepository = Symbol('ClientsRepository');
