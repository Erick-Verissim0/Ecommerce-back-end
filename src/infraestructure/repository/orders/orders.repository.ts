import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/domain/entities/orders';
import { OrderInterface } from 'src/presentation/interface/orders/order.interface';
import { OrdersRepository } from 'src/domain/repository/orders/orders.interface';
import { UpdateOrderDto } from 'src/application/dto/orders/update_order.dto';

@Injectable()
export class PgOrdersRepository implements OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async postOrder(orderData: any): Promise<any> {
    try {
      const newOrder = this.orderRepository.create({
        ...orderData,
        client: { id: orderData.client_id },
      });

      return await this.orderRepository.save(newOrder);
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  async getAllOrders(): Promise<OrderInterface[]> {
    try {
      return await this.orderRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  async getOneOrder(id: number): Promise<OrderInterface | null> {
    try {
      const order = await this.orderRepository.findOne({ where: { id } });
      if (!order) throw new NotFoundException(`Order with id ${id} not found`);

      return order;
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  async updateOrder(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderInterface | null> {
    try {
      const order = await this.getOneOrder(id);
      if (!order) throw new NotFoundException(`Order with id ${id} not found`);

      Object.assign(order, updateOrderDto);

      return await this.orderRepository.save(order);
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  async deleteOrder(id: number): Promise<OrderInterface | null> {
    try {
      const order = await this.orderRepository.findOne({ where: { id } });

      if (!order) {
        throw new NotFoundException(`Order with id ${id} not found`);
      }

      order.deleted_at = new Date();

      return await this.orderRepository.save(order);
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }
}
