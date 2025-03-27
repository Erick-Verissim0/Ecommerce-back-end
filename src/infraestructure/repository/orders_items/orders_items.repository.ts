import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from 'src/domain/entities/orders_items';
import { OrdersItemsRepository } from 'src/domain/repository/orders_items/orders_items.interface';
import { OrdersItemsInterface } from 'src/presentation/interface/orders_items/orders_items.interface';
import { orderItemMapHelper } from 'src/domain/helper/get_orders_items.helper';
import { Product } from 'src/domain/entities/products';
import { Order } from 'src/domain/entities/orders';
import { PostOrderItemDto } from 'src/application/dto/orders_items/post_order_item.dto';

@Injectable()
export class PgOrdersItemsRepository implements OrdersItemsRepository {
  constructor(
    @InjectRepository(OrderItem)
    private readonly ordersItemsRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async postOrderItem(data: PostOrderItemDto): Promise<OrdersItemsInterface> {
    try {
      const product = await this.productRepository.findOne({
        where: { id: data.product_id },
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      if (product.stock < data.quantity) {
        throw new InternalServerErrorException('Insufficient stock');
      }

      const order = await this.orderRepository.findOne({
        where: { id: data.order_id },
      });

      if (!order) {
        throw new NotFoundException('Order not found');
      }

      product.stock -= data.quantity;
      await this.productRepository.save(product);

      const orderItem = this.ordersItemsRepository.create({
        order,
        product,
        quantity: data.quantity,
        price_per_unit: data.price_per_unit,
        total_price: data.price_per_unit * data.quantity,
      });

      await this.ordersItemsRepository.save(orderItem);

      order.status = 'In preparation';
      await this.orderRepository.save(order);

      return orderItemMapHelper([orderItem])[0];
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  async updateOrderItem(
    id: number,
    data: Partial<OrdersItemsInterface>,
  ): Promise<void> {
    try {
      const orderItem = await this.ordersItemsRepository.findOne({
        where: { id },
        relations: ['order'],
      });

      if (!orderItem) {
        throw new NotFoundException('Order item not found');
      }

      if (data.quantity !== undefined) {
        orderItem.quantity = data.quantity;
      }
      if (data.price_per_unit !== undefined) {
        orderItem.price_per_unit = data.price_per_unit;
      }
      if (data.total_price !== undefined) {
        orderItem.total_price = data.total_price;
      }
      if (data.created_at) {
        orderItem.created_at = data.created_at;
      }
      if (data.updated_at) {
        orderItem.updated_at = data.updated_at;
      }
      if (data.deleted_at !== undefined) {
        orderItem.deleted_at = data.deleted_at;
      }
      if (data.order?.order_status) {
        await this.orderRepository.update(orderItem.order.id, {
          status: data.order.order_status,
        });
      }

      await this.ordersItemsRepository.save(orderItem);
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  async deleteOrderItem(id: number): Promise<void> {
    const orderItem = await this.ordersItemsRepository.findOne({
      where: { id },
      relations: ['product'],
    });

    if (!orderItem) {
      throw new NotFoundException(`OrderItem with ID ${id} not found.`);
    }

    try {
      orderItem.deleted_at = new Date();

      orderItem.product.stock += orderItem.quantity;

      await this.productRepository.save(orderItem.product);
      await this.ordersItemsRepository.save(orderItem);
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  async getByIdOrderItem(id: number): Promise<any> {
    try {
      const orderItem = await this.ordersItemsRepository.findOne({
        where: { id },
        relations: ['product', 'order'],
      });

      if (!orderItem) {
        return [];
      }

      return orderItem;
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  async getAllOrderItems(): Promise<OrdersItemsInterface[]> {
    try {
      const orderItems = await this.ordersItemsRepository.find({
        relations: ['order', 'product'],
      });

      return orderItemMapHelper(orderItems);
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }
}
