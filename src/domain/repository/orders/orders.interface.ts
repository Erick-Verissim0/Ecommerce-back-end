import { UpdateOrderDto } from 'src/application/dto/orders/update_order.dto';
import { OrderInterface } from 'src/presentation/interface/orders/order.interface';

export interface OrdersRepository {
  postOrder(orderData: OrderInterface): Promise<OrderInterface>;
  getAllOrders(): Promise<OrderInterface[]>;
  getOneOrder(id: number): Promise<OrderInterface | null>;
  updateOrder(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderInterface | null>;
  deleteOrder(id: number): Promise<OrderInterface | null>;
}

export const OrdersRepository = Symbol('OrdersRepository');
