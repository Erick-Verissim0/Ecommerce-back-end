import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { ApplicationModule } from 'src/application/application.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from 'src/infraestructure/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ClientsController } from './clients/clients.controller';
import { ProductsController } from './products/products.controller';
import { OrdersController } from './orders/orders.controller';

@Module({
  imports: [ApplicationModule],
  providers: [AuthService, JwtService],
  controllers: [
    UsersController,
    AuthController,
    ClientsController,
    ProductsController,
    OrdersController,
  ],
})
export class ControllersModule {}
