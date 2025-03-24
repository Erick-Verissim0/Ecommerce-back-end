import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/users';
import { UsersRepository } from './repository/users/users.interface';
import { PgUsersRepository } from 'src/infraestructure/repository/users/users.repository';
import { Client } from './entities/clients';
import { ClientsRepository } from './repository/clients/clients.interface';
import { PgClientsRepository } from 'src/infraestructure/repository/clients/clients.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Client])],
  providers: [
    PgUsersRepository,
    { provide: UsersRepository, useClass: PgUsersRepository },

    PgClientsRepository,
    { provide: ClientsRepository, useClass: PgClientsRepository },
  ],
  exports: [TypeOrmModule, UsersRepository, ClientsRepository],
})
export class DomainModule {}
