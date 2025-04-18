import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/users';
import { Client } from 'src/domain/entities/clients';
import { Product } from 'src/domain/entities/products';
import { Order } from 'src/domain/entities/orders';
import { OrderItem } from 'src/domain/entities/orders_items';
import { SalesReport } from 'src/domain/entities/sales_reports';
import { config } from 'src/infraestructure/config/environment/enviroment.confg';

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
