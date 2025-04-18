import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderInterface } from 'src/presentation/interface/orders/order.interface';
import { OrdersRepository } from 'src/domain/repository/orders/orders.interface';
import { UpdateOrderDto } from 'src/application/dto/orders/update_order.dto';
import { OrderModel } from 'src/infraestructure/config/typeorm/models/orders.typeorm';
import { ProductModel } from 'src/infraestructure/config/typeorm/models/products.typeorm';

@Injectable()
export class PgOrdersRepository implements OrdersRepository {
  constructor(
    @InjectRepository(OrderModel)
    private readonly orderRepository: Repository<OrderModel>,
    @InjectRepository(ProductModel)
    private readonly productRepository: Repository<ProductModel>,
  ) {}

  async postOrder(orderData: any): Promise<any> {
    try {
      const product = await this.productRepository.findOne(
        orderData.product_id,
      );

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      if (product.stock < orderData.quantity) {
        throw new InternalServerErrorException(
          'Insufficient stock for the product',
        );
      }

      product.stock -= orderData.quantity;
      await this.productRepository.save(product);

      const newOrder = this.orderRepository.create(orderData);

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
