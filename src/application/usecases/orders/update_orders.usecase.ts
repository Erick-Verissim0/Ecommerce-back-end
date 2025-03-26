import {
  Inject,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { OrdersRepository } from 'src/domain/repository/orders/orders.interface';
import { UpdateOrderDto } from 'src/application/dto/orders/update_order.dto';
import { OrderInterface } from 'src/presentation/interface/orders/order.interface';

@Injectable()
export class UpdateOrderUseCase {
  constructor(
    @Inject(OrdersRepository)
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async execute(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderInterface> {
    try {
      const order = await this.ordersRepository.getOneOrder(id);
      if (!order) throw new NotFoundException(`Order with id ${id} not found`);

      return await this.ordersRepository.updateOrder(id, updateOrderDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update order');
    }
  }
}
