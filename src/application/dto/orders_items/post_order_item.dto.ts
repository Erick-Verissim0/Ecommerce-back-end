import { IsNumber, IsPositive, IsNotEmpty, IsString } from 'class-validator';

export class PostOrderItemDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  order_id: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  product_id: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price_per_unit: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  total_price: number;

  @IsString()
  payment_id?: string;
}
