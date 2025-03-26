import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/domain/repository/users/users.interface';
import { User } from 'src/domain/entities/users';
import { PgUsersRepository } from './repository/users/users.repository';
import { ClientsRepository } from 'src/domain/repository/clients/clients.interface';
import { PgClientsRepository } from './repository/clients/clients.repository';
import { Client } from 'src/domain/entities/clients';
import { OrdersRepository } from 'src/domain/repository/orders/orders.interface';
import { PgOrdersRepository } from './repository/orders/orders.repository';
import { Order } from 'src/domain/entities/orders';
import { Product } from 'src/domain/entities/products';
import { PgProductsRepository } from './repository/products/products.repository';
import { ProductsRepository } from 'src/domain/repository/products/products.interface';
import { PgOrdersItemsRepository } from './repository/orders_items/orders_items.repository';
import { OrdersItemsRepository } from 'src/domain/repository/orders_items/orders_items.interface';
import { OrderItem } from 'src/domain/entities/orders_items';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Client, Product, Order, OrderItem]),
  ],
  providers: [
    PgUsersRepository,
    { provide: UsersRepository, useClass: PgUsersRepository },

    PgClientsRepository,
    { provide: ClientsRepository, useClass: PgClientsRepository },

    PgProductsRepository,
    { provide: ProductsRepository, useClass: PgProductsRepository },

    PgOrdersRepository,
    { provide: OrdersRepository, useClass: PgOrdersRepository },

    PgOrdersItemsRepository,
    { provide: OrdersItemsRepository, useClass: PgOrdersItemsRepository },
  ],
  exports: [
    UsersRepository,
    ClientsRepository,
    ProductsRepository,
    OrdersRepository,
    OrdersItemsRepository,
  ],
})
export class InfrastructureModule {}
