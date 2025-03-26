import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { OrdersItemsRepository } from 'src/domain/repository/orders_items/orders_items.interface';
import { OrdersItemsInterface } from 'src/presentation/interface/orders_items/orders_items.interface';

@Injectable()
export class GetAllOrderItemsUseCase {
  constructor(
    @Inject(OrdersItemsRepository)
    private readonly orderItemsRepository: OrdersItemsRepository,
  ) {}

  async execute(): Promise<OrdersItemsInterface[]> {
    try {
      const orderItems = await this.orderItemsRepository.getAllOrderItems();
      return orderItems;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to view orders items: ${error.message}`,
      );
    }
  }
}
