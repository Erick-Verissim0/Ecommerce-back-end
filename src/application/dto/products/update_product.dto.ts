import {
  IsInt,
  IsOptional,
  IsString,
  IsNumber,
  Min,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @Length(1, 255, { message: 'Name should be between 1 and 255 characters.' })
  name?: string;

  @IsOptional()
  @IsString()
  @Length(1, 500, {
    message: 'Description should be between 1 and 500 characters.',
  })
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Price must be greater than or equal to 0' })
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @IsInt()
  @Min(0, { message: 'Stock must be greater than or equal to 0' })
  @Type(() => Number)
  stock?: number;
}
