import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersItemsRepository } from 'src/domain/repository/orders_items/orders_items.interface';
import { OrdersItemsInterface } from 'src/presentation/interface/orders_items/orders_items.interface';
import { orderItemMapHelper } from 'src/infraestructure/helpers/get_orders_items.helper';
import { PostOrderItemDto } from 'src/application/dto/orders_items/post_order_item.dto';
import { OrderItemModel } from 'src/infraestructure/config/typeorm/models/orders-items.typeorm';
import { ProductModel } from 'src/infraestructure/config/typeorm/models/products.typeorm';
import { OrderModel } from 'src/infraestructure/config/typeorm/models/orders.typeorm';

@Injectable()
export class PgOrdersItemsRepository implements OrdersItemsRepository {
  constructor(
    @InjectRepository(OrderItemModel)
    private readonly ordersItemsRepository: Repository<OrderItemModel>,
    @InjectRepository(ProductModel)
    private readonly productRepository: Repository<ProductModel>,
    @InjectRepository(OrderModel)
    private readonly orderRepository: Repository<OrderModel>,
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
  ): Promise<OrdersItemsInterface> {
    try {
      const orderItem = await this.ordersItemsRepository.findOne({
        where: { id },
        relations: ['order', 'product'],
      });

      if (!orderItem) {
        throw new NotFoundException('Order item not found');
      }

      let product = orderItem.product;

      if (data.product?.product_id) {
        const newProduct = await this.productRepository.findOne({
          where: { id: data.product.product_id },
        });

        if (!newProduct) {
          throw new NotFoundException('Product not found');
        }

        if (product.id !== newProduct.id) {
          product.stock += orderItem.quantity;
          await this.productRepository.save(product);

          product = newProduct;
        }
      }

      if (data.order?.order_id) {
        const order = await this.orderRepository.findOne({
          where: { id: data.order.order_id },
        });

        if (!order) {
          throw new NotFoundException('Order not found');
        }

        orderItem.order = order;
      }

      if (data.quantity) {
        const quantityDifference = data.quantity - orderItem.quantity;

        orderItem.quantity = data.quantity;
        product.stock -= quantityDifference;

        await this.productRepository.save(product);
      }

      if (data.price_per_unit !== undefined) {
        orderItem.price_per_unit = data.price_per_unit;
      }

      orderItem.total_price = orderItem.price_per_unit * orderItem.quantity;

      Object.assign(orderItem, data);

      await this.ordersItemsRepository.save(orderItem);

      return orderItemMapHelper([orderItem])[0];
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

  async getByIdOrderItem(id: number): Promise<OrdersItemsInterface[]> {
    try {
      const orderItem = await this.ordersItemsRepository.find({
        where: { order: { id: id }, deleted_at: null },
        relations: ['product', 'order'],
      });
      return orderItemMapHelper(orderItem);
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
