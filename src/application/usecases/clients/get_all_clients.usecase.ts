import { Inject, Injectable } from '@nestjs/common';
import { getClientsUseCaseHelper } from 'src/domain/helper/get_client_helper';
import { ClientsRepository } from 'src/domain/repository/clients/clients.interface';
import { GetAllClientsInterface } from 'src/presentation/interface/clients/get_all_clients.interface';

@Injectable()
export class GetAllClientsUseCase {
  constructor(
    @Inject(ClientsRepository)
    private readonly clientsRepository: ClientsRepository,
  ) {}

  async execute(): Promise<GetAllClientsInterface[]> {
    try {
      const clients = await this.clientsRepository.getAllClient();

      return getClientsUseCaseHelper(clients);
    } catch (error) {
      throw new Error(`Erro ao buscar clientes: ${error.message}`);
    }
  }
}
