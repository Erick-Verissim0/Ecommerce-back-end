import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/users';
import { UsersRepository } from './repository/users/users.interface';
import { PgUsersRepository } from 'src/infraestructure/repository/users/users.repository';
import { Client } from './entities/clients';
import { ClientsRepository } from './repository/clients/clients.interface';
import { PgClientsRepository } from 'src/infraestructure/repository/clients/clients.repository';
import { Product } from './entities/products';
import { PgProductsRepository } from 'src/infraestructure/repository/products/products.repository';
import { ProductsRepository } from './repository/products/products.interface';

@Module({
  imports: [TypeOrmModule.forFeature([User, Client, Product])],
  providers: [
    PgUsersRepository,
    { provide: UsersRepository, useClass: PgUsersRepository },

    PgClientsRepository,
    { provide: ClientsRepository, useClass: PgClientsRepository },

    PgProductsRepository,
    { provide: ProductsRepository, useClass: PgProductsRepository },
  ],
  exports: [
    TypeOrmModule,
    UsersRepository,
    ClientsRepository,
    ProductsRepository,
  ],
})
export class DomainModule {}
