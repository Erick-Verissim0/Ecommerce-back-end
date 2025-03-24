import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users';
import { Client } from './clients';
import { Product } from './products';
import { OrderItem } from './orders_items';
import { SalesReport } from './sales_reports';
import { Order } from './orders';

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
  exports: [TypeOrmModule],
})
export class EntitiesModule {}
