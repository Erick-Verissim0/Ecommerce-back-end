import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { OrdersItemsRepository } from 'src/domain/repository/orders_items/orders_items.interface';
import { OrdersItemsInterface } from 'src/presentation/interface/orders_items/orders_items.interface';

@Injectable()
export class GetByIdOrderItem {
  constructor(
    @Inject(OrdersItemsRepository)
    private readonly ordersItemsRepository: OrdersItemsRepository,
  ) {}

  async execute(id: number): Promise<OrdersItemsInterface[]> {
    try {
      const orderItem = await this.ordersItemsRepository.getByIdOrderItem(id);

      if (!orderItem || orderItem.length === 0) {
        throw new NotFoundException(`No items found for order id ${id}`);
      }

      return orderItem;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to view order item: ${error.message}`,
      );
    }
  }
}
