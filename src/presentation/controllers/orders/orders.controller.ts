import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostOrderDto } from 'src/application/dto/orders/post_order.dto';
import { UpdateOrderDto } from 'src/application/dto/orders/update_order.dto';
import { DeleteOrderUseCase } from 'src/application/usecases/orders/delete_orders.usecase';
import { GetAllOrdersUseCase } from 'src/application/usecases/orders/get_all_orders.usecase';
import { GetOneOrderUseCase } from 'src/application/usecases/orders/get_one_order.usecase';
import { PostOrdersUseCase } from 'src/application/usecases/orders/post_orders.usecase';
import { UpdateOrderUseCase } from 'src/application/usecases/orders/update_orders.usecase';
import { JwtAuthGuard } from 'src/infraestructure/guards/auth.guard';
import { OrderInterface } from 'src/presentation/interface/orders/order.interface';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly postOrdersUseCase: PostOrdersUseCase,
    private readonly getAllOrdersUseCase: GetAllOrdersUseCase,
    private readonly getOneOrderUseCase: GetOneOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly deleteOrderUseCase: DeleteOrderUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async postProducts(@Body() data: PostOrderDto): Promise<OrderInterface> {
    return this.postOrdersUseCase.execute(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<OrderInterface> {
    return this.updateOrderUseCase.execute(id, updateOrderDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteOrder(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OrderInterface | { message: string }> {
    try {
      return this.deleteOrderUseCase.execute(id);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllOrders(): Promise<OrderInterface[]> {
    return this.getAllOrdersUseCase.execute();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getOrderById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OrderInterface> {
    return this.getOneOrderUseCase.execute(id);
  }
}
