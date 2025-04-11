import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/environment/enviroment.confg';
import { User } from 'src/domain/entities/users';
import { Client } from 'src/domain/entities/clients';
import { Product } from 'src/domain/entities/products';
import { Order } from 'src/domain/entities/orders';
import { OrderItem } from 'src/domain/entities/orders_items';
import { SalesReport } from 'src/domain/entities/sales_reports';

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
