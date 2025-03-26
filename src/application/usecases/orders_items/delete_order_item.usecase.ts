import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { OrdersItemsRepository } from 'src/domain/repository/orders_items/orders_items.interface';

@Injectable()
export class DeleteOrderItemUseCase {
  constructor(
    @Inject(OrdersItemsRepository)
    private readonly ordersItemsRepository: OrdersItemsRepository,
  ) {}

  async execute(id: number): Promise<void> {
    try {
      await this.ordersItemsRepository.deleteOrderItem(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete order item: ${error.message}`,
      );
    }
  }
}
