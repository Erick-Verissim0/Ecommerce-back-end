import { Inject, Injectable } from '@nestjs/common';
import { getClientsUseCaseHelper } from 'src/infraestructure/helpers/get_client_helper';
import { ClientsRepository } from 'src/domain/repository/clients/clients.interface';
import { GetClientsInterface } from 'src/presentation/interface/clients/get_clients.interface';

@Injectable()
export class GetAllClientsUseCase {
  constructor(
    @Inject(ClientsRepository)
    private readonly clientsRepository: ClientsRepository,
  ) {}

  async execute(): Promise<GetClientsInterface[] | null> {
    try {
      const clients = await this.clientsRepository.getAllClient();

      return getClientsUseCaseHelper(clients);
    } catch (error) {
      throw new Error(`Error in search client: ${error.message}`);
    }
  }
}
