import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { OrdersRepository } from 'src/domain/repository/orders/orders.interface';
import { OrderInterface } from 'src/presentation/interface/orders/order.interface';

@Injectable()
export class GetAllOrdersUseCase {
  constructor(
    @Inject(OrdersRepository)
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async execute(): Promise<OrderInterface[]> {
    try {
      return this.ordersRepository.getAllOrders();
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to load orders: ${error.message}`,
      );
    }
  }
}
