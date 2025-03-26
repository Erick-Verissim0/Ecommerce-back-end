import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PostOrderDto } from 'src/application/dto/orders/post_order.dto';
import { OrdersRepository } from 'src/domain/repository/orders/orders.interface';
import { PaymentService } from 'src/infraestructure/services/payment/payment.service';
import { OrderInterface } from 'src/presentation/interface/orders/order.interface';

@Injectable()
export class PostOrdersUseCase {
  constructor(
    @Inject(OrdersRepository)
    private readonly ordersRepository: OrdersRepository,
    @Inject(PaymentService)
    private readonly paymentService: PaymentService,
  ) {}

  async execute(createOrderDto: PostOrderDto): Promise<OrderInterface> {
    try {
      const newOrder: OrderInterface = {
        client_id: createOrderDto.client_id,
        status: 'Received',
        total_price: createOrderDto.total_price,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };

      const createdOrder = await this.ordersRepository.postOrder(newOrder);

      if (!createdOrder) throw new Error('Error in create order');

      const approvalLink = await this.paymentService.createOrderPayment(
        createOrderDto.total_price.toString(),
        'Order payment',
      );

      if (!approvalLink) {
        throw new InternalServerErrorException('Failed to create PayPal order');
      }

      createdOrder.payment_approval_link = approvalLink;

      return createdOrder;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create order: ${error.message}`,
      );
    }
  }
}
