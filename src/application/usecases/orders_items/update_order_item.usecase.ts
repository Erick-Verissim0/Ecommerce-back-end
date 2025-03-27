import { Inject, Injectable } from '@nestjs/common';
import { OrdersItemsRepository } from 'src/domain/repository/orders_items/orders_items.interface';
import { OrdersItemsInterface } from 'src/presentation/interface/orders_items/orders_items.interface';

@Injectable()
export class UpdateOrderItemUseCase {
  constructor(
    @Inject(OrdersItemsRepository)
    private readonly orderItemsRepository: OrdersItemsRepository,
  ) {}

  async execute(
    id: number,
    data: Partial<OrdersItemsInterface>,
  ): Promise<void> {
    try {
      await this.orderItemsRepository.updateOrderItem(id, data);
    } catch (error) {
      throw new Error(`Failed to update order item: ${error.message}`);
    }
  }
}
