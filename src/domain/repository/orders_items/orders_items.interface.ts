import { PostOrderItemDto } from 'src/application/dto/orders_items/post_order_item.dto';
import { OrdersItemsInterface } from 'src/presentation/interface/orders_items/orders_items.interface';

export interface OrdersItemsRepository {
  postOrderItem(data: PostOrderItemDto): Promise<OrdersItemsInterface>;
  getByIdOrderItem(id: number): Promise<OrdersItemsInterface[]>;
  getAllOrderItems(): Promise<OrdersItemsInterface[]>;
  updateOrderItem(
    id: number,
    data: Partial<OrdersItemsInterface>,
  ): Promise<void>;
  deleteOrderItem(id: number): Promise<void>;
}

export const OrdersItemsRepository = Symbol('OrdersItemsRepository');
