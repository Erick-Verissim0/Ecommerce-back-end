import {
  Inject,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { OrdersRepository } from 'src/domain/repository/orders/orders.interface';
import { OrderInterface } from 'src/presentation/interface/orders/order.interface';

@Injectable()
export class DeleteOrderUseCase {
  constructor(
    @Inject(OrdersRepository)
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async execute(id: number): Promise<OrderInterface | null> {
    try {
      return await this.ordersRepository.deleteOrder(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error deleting order: ${error.message}`,
      );
    }
  }
}
