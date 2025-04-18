import { ClientModel } from '../config/typeorm/models/clients.typeorm';
import { GetClientsInterface } from 'src/presentation/interface/clients/get_clients.interface';

export function getClientRepositoryHelper(
  client: ClientModel | null,
): GetClientsInterface | null {
  if (!client || !client.user || client.user.deleted_at) return null;

  return {
    id: client.id,
    name: client.name,
    contact: client.contact,
    address: client.address,
    created_at: client.created_at,
    updated_at: client.updated_at,
    user: {
      id: client.user.id,
      name: client.user.name,
      email: client.user.email,
      type: client.user.type,
      created_at: client.user.created_at,
      updated_at: client.user.updated_at,
    },
  };
}

export function getClientsRepositoryHelper(
  clients: ClientModel[],
): GetClientsInterface[] {
  return clients
    .filter((client) => client.user && !client.user.deleted_at)
    .map(getClientRepositoryHelper) as GetClientsInterface[];
}

export function getClientUseCaseHelper(client: any): any {
  if (!client) return null;

  return {
    id: client.id,
    name: client.name,
    contact: client.contact,
    address: client.address,
    created_at: client.created_at,
    updated_at: client.updated_at,
    user: {
      id: client.user.id,
      name: client.user.name,
      email: client.user.email,
      type: client.user.type,
      created_at: client.user.created_at,
      updated_at: client.user.updated_at,
    },
  };
}

export function getClientsUseCaseHelper(
  clients: GetClientsInterface[],
): GetClientsInterface[] {
  return clients.map(getClientUseCaseHelper) as GetClientsInterface[];
}

