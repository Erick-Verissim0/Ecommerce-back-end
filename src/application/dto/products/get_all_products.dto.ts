import { IsInt, IsOptional, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAllProductsDto {
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'minPrice must be greater than or equal to 0' })
  @Type(() => Number)
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'maxPrice must be greater than or equal to 0' })
  @Type(() => Number)
  maxPrice?: number;

  @IsOptional()
  @IsInt()
  @Min(0, { message: 'minStock must be greater than or equal to 0' })
  @Type(() => Number)
  minStock?: number;

  @IsOptional()
  @IsInt()
  @Min(0, { message: 'maxStock must be greater than or equal to 0' })
  @Type(() => Number)
  maxStock?: number;
}
