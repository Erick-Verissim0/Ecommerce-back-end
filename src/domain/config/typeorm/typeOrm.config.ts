import { DataSource } from 'typeorm';
import { Users1742579698310 } from '../../../../database/migrations/1742579698310-users';
import { Clients1742580016359 } from '../../../../database/migrations/1742580016359-clients';
import { Orders1742587051820 } from '../../../../database/migrations/1742587051820-orders';
import { Products1742586722531 } from '../../../../database/migrations/1742586722531-products';
import { OrdersItems1742663212173 } from '../../../../database/migrations/1742663212173-orders_items';
import { SalesReports1742663897531 } from '../../../../database/migrations/1742663897531-sales_reports';
import { User } from '../../entities/users';
import { Client } from '../../entities/clients';
import { Order } from '../../entities/orders';
import { Product } from '../../entities/products';
import { OrderItem } from '../../entities/orders_items';
import { SalesReport } from '../../entities/sales_reports';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'root',
  database: process.env.DATABASE || 'loomi',
  entities: [User, Client, Order, Product, OrderItem, SalesReport],
  migrations: [
    Users1742579698310,
    Clients1742580016359,
    Orders1742587051820,
    Products1742586722531,
    OrdersItems1742663212173,
    SalesReports1742663897531,
  ],
});
