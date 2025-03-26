import { IsNumber } from 'class-validator';

export class PostOrderDto {
  @IsNumber()
  client_id: number;

  @IsNumber()
  total_price: number;
}
