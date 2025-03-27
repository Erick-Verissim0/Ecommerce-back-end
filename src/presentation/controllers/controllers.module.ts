import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { ApplicationModule } from 'src/application/application.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from 'src/infraestructure/services/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ClientsController } from './clients/clients.controller';
import { ProductsController } from './products/products.controller';
import { OrdersController } from './orders/orders.controller';
import { OrderItemsController } from './orders_items/orders_items.controller';
import { SalesReportsController } from './sales_reports/sales_reports.controller';

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
    SalesReportsController,
  ],
})
export class ControllersModule {}
