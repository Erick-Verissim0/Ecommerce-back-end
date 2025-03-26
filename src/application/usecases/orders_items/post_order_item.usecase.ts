import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { PostOrderItemDto } from 'src/application/dto/orders_items/post_order_item.dto';
import { OrdersItemsRepository } from 'src/domain/repository/orders_items/orders_items.interface';
import { PaymentService } from 'src/infraestructure/services/payment/payment.service';
import { OrdersItemsInterface } from 'src/presentation/interface/orders_items/orders_items.interface';

@Injectable()
export class PostOrderItemUseCase {
  constructor(
    @Inject(OrdersItemsRepository)
    private readonly ordersItemsRepository: OrdersItemsRepository,

    @Inject(PaymentService)
    private readonly paymentService: PaymentService,
  ) {}

  async execute(data: PostOrderItemDto): Promise<OrdersItemsInterface> {
    try {
      const paymentResult = await this.paymentService.capturePayment(
        data.payment_id,
      );

      if (paymentResult !== true) {
        throw new Error('Customer did not pay for the order');
      }

      const createdOrderItem = await this.ordersItemsRepository.postOrderItem(
        data,
      );

      return createdOrderItem;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create order item: ${error.message}`,
      );
    }
  }
}
