import {
  Inject,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientsRepository } from 'src/domain/repository/clients/clients.interface';
import { DeleteClientsInterface } from 'src/presentation/interface/clients/delete_client.interface';

@Injectable()
export class DeleteClientsUseCase {
  constructor(
    @Inject(ClientsRepository)
    private readonly clientsRepository: ClientsRepository,
  ) {}

  async execute(id: number): Promise<DeleteClientsInterface | null> {
    try {
      const deletedClient = await this.clientsRepository.deleteClient(id);

      if (!deletedClient) {
        throw new NotFoundException('Client not found!');
      }

      return deletedClient;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete client: ${error.message}`,
      );
    }
  }
}
