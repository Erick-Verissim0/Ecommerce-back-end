import { Module } from '@nestjs/common';
import { UsersController } from '../../../../presentation/controllers/users/users.controller';
import { AuthController } from '../../../../presentation/controllers/auth/auth.controller';
import { AuthService } from 'src/infraestructure/services/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ClientsController } from '../../../../presentation/controllers/clients/clients.controller';
import { ProductsController } from '../../../../presentation/controllers/products/products.controller';
import { OrdersController } from '../../../../presentation/controllers/orders/orders.controller';
import { OrderItemsController } from '../../../../presentation/controllers/orders_items/orders_items.controller';
import { ApplicationModule } from '../../application/application.module';

@Module({
  imports: [ApplicationModule],
  providers: [AuthService, JwtService],
  controllers: [
    UsersController,
    AuthController,
    ClientsController,
    ProductsController,
    OrdersController,
    OrderItemsController,
  ],
})
export class ControllersModule {}
