import { Inject, Injectable } from '@nestjs/common';
import { getClientUseCaseHelper } from 'src/domain/helper/get_client_helper';
import { ClientsRepository } from 'src/domain/repository/clients/clients.interface';
import { GetClientsInterface } from 'src/presentation/interface/clients/get_clients.interface';

@Injectable()
export class GetOneClientUseCase {
  constructor(
    @Inject(ClientsRepository)
    private readonly clientsRepository: ClientsRepository,
  ) {}

  async execute(id: number): Promise<GetClientsInterface | null> {
    try {
      const client = await this.clientsRepository.getOneClient(id);
      return getClientUseCaseHelper(client);
    } catch (error) {
      throw new Error(`Error in search client: ${error.message}`);
    }
  }
}
