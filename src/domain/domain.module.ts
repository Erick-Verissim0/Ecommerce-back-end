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
import { OrdersRepository } from './repository/orders/orders.interface';
import { PgOrdersRepository } from 'src/infraestructure/repository/orders/orders.repository';
import { Order } from './entities/orders';
import { OrdersItemsRepository } from './repository/orders_items/orders_items.interface';
import { PgOrdersItemsRepository } from 'src/infraestructure/repository/orders_items/orders_items.repository';
import { OrderItem } from './entities/orders_items';
import { SalesReportsRepository } from './repository/sales_orders/sales_orders.interface';
import { PgSalesReportsRepository } from 'src/infraestructure/repository/sales_reports/sales_reports.repository';
import { SalesReport } from './entities/sales_reports';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Client,
      Product,
      Order,
      OrderItem,
      SalesReport,
    ]),
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

    PgSalesReportsRepository,
    { provide: SalesReportsRepository, useClass: PgSalesReportsRepository },
  ],
  exports: [
    TypeOrmModule,
    UsersRepository,
    ClientsRepository,
    ProductsRepository,
    OrdersRepository,
    OrdersItemsRepository,
    SalesReportsRepository,
  ],
})
export class DomainModule {}
