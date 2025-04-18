import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientsRepository } from 'src/domain/repository/clients/clients.interface';
import { UpdateClientsInterface } from 'src/presentation/interface/clients/update_client.interface';
import { getClientUseCaseHelper } from 'src/infraestructure/helpers/get_client_helper';
import { UsersRepository } from 'src/domain/repository/users/users.interface';

@Injectable()
export class UpdateClientUseCase {
  constructor(
    @Inject(ClientsRepository)
    private readonly clientsRepository: ClientsRepository,
    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(
    id: number,
    clientData: Partial<UpdateClientsInterface> & { user_id?: number },
  ): Promise<UpdateClientsInterface | null> {
    try {
      const user = await this.usersRepository.getOneUser(clientData.user_id);

      if (!user) {
        throw new NotFoundException('User not found!');
      }

      if (user.type.trim().toLowerCase() === 'admin') {
        throw new BadRequestException(
          'Only users of the type "client" can be updated.',
        );
      }

      const updatedClient = await this.clientsRepository.updateClient(
        id,
        clientData,
      );

      return getClientUseCaseHelper(updatedClient);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update client: ${error.message}`,
      );
    }
  }
}
