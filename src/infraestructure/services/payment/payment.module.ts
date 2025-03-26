import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/domain/entities/orders';
import { Product } from 'src/domain/entities/products';
import { PaymentService } from './payment.service';
import { PostOrdersUseCase } from 'src/application/usecases/orders/post_orders.usecase';
import { OrderItem } from 'src/domain/entities/orders_items';
import { DomainModule } from 'src/domain/domain.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Product, OrderItem]),
    DomainModule,
  ],
  providers: [PaymentService, PostOrdersUseCase],
  exports: [PaymentService],
})
export class PaymentModule {}
