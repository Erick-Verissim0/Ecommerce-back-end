import { IsNumber, IsEnum } from 'class-validator';

export class PostOrderDto {
  @IsNumber()
  client_id: number;

  @IsEnum(['Received', 'In preparation', 'Dispatched', 'Delivered'])
  status: 'Received' | 'In preparation' | 'Dispatched' | 'Delivered';

  @IsNumber()
  total_price: number;
}
