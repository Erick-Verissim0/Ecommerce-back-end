import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostOrderItemDto } from 'src/application/dto/orders_items/post_order_item.dto';
import { DeleteOrderItemUseCase } from 'src/application/usecases/orders_items/delete_order_item.usecase';
import { GetAllOrderItemsUseCase } from 'src/application/usecases/orders_items/get_all_orders.usecase';
import { GetByIdOrderItem } from 'src/application/usecases/orders_items/get_one_order_item.usecase';
import { PostOrderItemUseCase } from 'src/application/usecases/orders_items/post_order_item.usecase';
import { UpdateOrderItemUseCase } from 'src/application/usecases/orders_items/update_order_item.usecase';
import { JwtAuthGuard } from 'src/infraestructure/guards/auth.guard';
import { OrdersItemsInterface } from 'src/presentation/interface/orders_items/orders_items.interface';

@ApiTags('Orders Items')
@Controller('orders_items')
export class OrderItemsController {
  constructor(
    private readonly getByIdOrderItem: GetByIdOrderItem,
    private readonly getAllOrderItemsUseCase: GetAllOrderItemsUseCase,
    private readonly updateOrderItemUseCase: UpdateOrderItemUseCase,
    private readonly deleteOrderItemUseCase: DeleteOrderItemUseCase,
    private readonly postOrderItemUseCase: PostOrderItemUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrderItem(@Body() postOrderItemDto: PostOrderItemDto) {
    return await this.postOrderItemUseCase.execute(postOrderItemDto);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updateOrderItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<OrdersItemsInterface>,
  ) {
    return this.updateOrderItemUseCase.execute(id, data);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteOrderItem(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.deleteOrderItemUseCase.execute(id);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getOneOrderItem(@Param('id', ParseIntPipe) id: number) {
    return await this.getByIdOrderItem.execute(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllOrderItems(): Promise<OrdersItemsInterface[]> {
    return await this.getAllOrderItemsUseCase.execute();
  }
}
