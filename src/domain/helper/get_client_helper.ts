import { Client } from 'src/domain/entities/clients';
import { GetAllClientsInterface } from 'src/presentation/interface/clients/get_all_clients.interface';

export function getClientsRepositoryHelper(
  clients: Client[],
): GetAllClientsInterface[] {
  return clients
    .filter((client) => client.user && !client.user.deleted_at)
    .map((client) => ({
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
    }));
}

export function getClientsUseCaseHelper(clients: GetAllClientsInterface[]) {
  return clients.map((client) => ({
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
  }));
}
