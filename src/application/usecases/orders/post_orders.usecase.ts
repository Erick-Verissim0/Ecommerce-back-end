import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PostOrderDto } from 'src/application/dto/orders/post_order.dto';
import { OrdersRepository } from 'src/domain/repository/orders/orders.interface';
import { OrderInterface } from 'src/presentation/interface/orders/order.interface';

@Injectable()
export class PostOrdersUseCase {
  constructor(
    @Inject(OrdersRepository)
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async execute(createOrderDto: PostOrderDto): Promise<OrderInterface> {
    try {
      const newOrder: OrderInterface = {
        client_id: createOrderDto.client_id,
        status: createOrderDto.status,
        total_price: createOrderDto.total_price,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };

      return this.ordersRepository.postOrder(newOrder);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create order: ${error.message}`,
      );
    }
  }
}
