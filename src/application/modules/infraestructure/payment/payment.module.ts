import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostOrdersUseCase } from 'src/application/usecases/orders/post_orders.usecase';
import { OrderModel } from 'src/infraestructure/config/typeorm/models/orders.typeorm';
import { ProductModel } from 'src/infraestructure/config/typeorm/models/products.typeorm';
import { OrderItemModel } from 'src/infraestructure/config/typeorm/models/orders-items.typeorm';
import { DomainModule } from '../../domain/domain.module';
import { PaymentService } from 'src/infraestructure/services/payment/payment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderModel, ProductModel, OrderItemModel]),
    DomainModule,
  ],
  providers: [PaymentService, PostOrdersUseCase],
  exports: [PaymentService],
})
export class PaymentModule {}
