import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { OrdersRepository } from 'src/domain/repository/orders/orders.interface';
import { OrderInterface } from 'src/presentation/interface/orders/order.interface';

@Injectable()
export class GetOneOrderUseCase {
  constructor(
    @Inject(OrdersRepository)
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async execute(id: number): Promise<OrderInterface> {
    try {
      const order = await this.ordersRepository.getOneOrder(id);
      if (!order) {
        throw new NotFoundException(`Order with id ${id} not found`);
      }
      return order;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to view order: ${error.message}`,
      );
    }
  }
}
