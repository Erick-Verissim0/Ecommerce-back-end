import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/domain/repository/users/users.interface';
import { User } from 'src/domain/entities/users';
import { PgUsersRepository } from './repository/users/users.repository';
import { ClientsRepository } from 'src/domain/repository/clients/clients.interface';
import { PgClientsRepository } from './repository/clients/clients.repository';
import { Client } from 'src/domain/entities/clients';

@Module({
  imports: [TypeOrmModule.forFeature([User, Client])],
  providers: [
    PgUsersRepository,
    { provide: UsersRepository, useClass: PgUsersRepository },

    PgClientsRepository,
    { provide: ClientsRepository, useClass: PgClientsRepository },
  ],
  exports: [UsersRepository, ClientsRepository],
})
export class InfrastructureModule {}
