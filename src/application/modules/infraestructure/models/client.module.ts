import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeleteClientsUseCase } from 'src/application/usecases/clients/delete_client.usecase';
import { GetAllClientsUseCase } from 'src/application/usecases/clients/get_all_clients.usecase';
import { GetOneClientUseCase } from 'src/application/usecases/clients/get_one_client.usecase';
import { PostClientsUseCase } from 'src/application/usecases/clients/post_client.usecase';
import { UpdateClientUseCase } from 'src/application/usecases/clients/update_client.usecase';
import { ClientsRepository } from 'src/domain/repository/clients/clients.interface';
import { UsersRepository } from 'src/domain/repository/users/users.interface';
import { ClientModel } from 'src/infraestructure/config/typeorm/models/clients.typeorm';
import { UserModel } from 'src/infraestructure/config/typeorm/models/users.typeorm.';
import { PgClientsRepository } from 'src/infraestructure/repository/clients/clients.repository';
import { PgUsersRepository } from 'src/infraestructure/repository/users/users.repository';
import { ClientsController } from 'src/presentation/controllers/clients/clients.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClientModel, UserModel])],
  providers: [
    PostClientsUseCase,
    DeleteClientsUseCase,
    UpdateClientUseCase,
    GetAllClientsUseCase,
    GetOneClientUseCase,
    {
      provide: ClientsRepository,
      useClass: PgClientsRepository,
    },
    {
      provide: UsersRepository,
      useClass: PgUsersRepository,
    },
  ],
  controllers: [ClientsController],
  exports: [ClientsRepository, UsersRepository],
})
export class ClientModule {}
