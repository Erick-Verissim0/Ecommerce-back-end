import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/users';
import { ClientsRepository } from 'src/domain/repository/clients/clients.interface';
import { UpdateClientsInterface } from 'src/presentation/interface/clients/update_client.interface';
import { getClientUseCaseHelper } from 'src/domain/helper/get_client_helper';

@Injectable()
export class UpdateClientUseCase {
  constructor(
    @Inject(ClientsRepository)
    private readonly clientsRepository: ClientsRepository,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async execute(
    id: number,
    clientData: Partial<UpdateClientsInterface> & { user_id?: number },
  ): Promise<UpdateClientsInterface | null> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: clientData.user_id },
      });

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
