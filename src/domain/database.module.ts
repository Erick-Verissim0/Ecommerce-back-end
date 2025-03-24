import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/environment/enviroment.confg';
import { User } from './entities/users';
import { Client } from './entities/clients';
import { Order } from './entities/orders';
import { Product } from './entities/products';
import { SalesReport } from './entities/sales_reports';
import { OrderItem } from './entities/orders_items';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const getConfig = await config();

        return {
          type: 'postgres',
          host: getConfig.databaseHost,
          port: getConfig.databasePort,
          username: getConfig.databaseUsername,
          password: getConfig.databasePassword,
          database: getConfig.databaseName,
          entities: [User, Client, Product, Order, OrderItem, SalesReport],
          migrations: ['../../database/migrations/*.ts'],
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
