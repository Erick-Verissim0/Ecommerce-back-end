import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(['Received', 'In preparation', 'Dispatched', 'Delivered'])
  status?: 'Received' | 'In preparation' | 'Dispatched' | 'Delivered';

  @IsOptional()
  @IsNumber()
  total_price?: number;
}
