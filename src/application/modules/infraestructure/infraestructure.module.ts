import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsRepository } from 'src/domain/repository/clients/clients.interface';
import { OrdersRepository } from 'src/domain/repository/orders/orders.interface';
import { OrdersItemsRepository } from 'src/domain/repository/orders_items/orders_items.interface';
import { ProductsRepository } from 'src/domain/repository/products/products.interface';
import { UsersRepository } from 'src/domain/repository/users/users.interface';
import { ClientModel } from 'src/infraestructure/config/typeorm/models/clients.typeorm';
import { OrderItemModel } from 'src/infraestructure/config/typeorm/models/orders-items.typeorm';
import { OrderModel } from 'src/infraestructure/config/typeorm/models/orders.typeorm';
import { ProductModel } from 'src/infraestructure/config/typeorm/models/products.typeorm';
import { UserModel } from 'src/infraestructure/config/typeorm/models/users.typeorm.';
import { PgClientsRepository } from 'src/infraestructure/repository/clients/clients.repository';
import { PgOrdersRepository } from 'src/infraestructure/repository/orders/orders.repository';
import { PgOrdersItemsRepository } from 'src/infraestructure/repository/orders_items/orders_items.repository';
import { PgProductsRepository } from 'src/infraestructure/repository/products/products.repository';
import { PgUsersRepository } from 'src/infraestructure/repository/users/users.repository';
import { PaymentService } from 'src/infraestructure/services/payment/payment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserModel,
      ClientModel,
      ProductModel,
      OrderModel,
      OrderItemModel,
    ]),
  ],
  providers: [
    PaymentService,

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
