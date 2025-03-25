import { IsNotEmpty, IsString, IsNumber, Min, MaxLength } from 'class-validator';

export class PostProductDto {
  @IsNotEmpty({ message: 'O nome do produto é obrigatório.' })
  @IsString({ message: 'O nome do produto deve ser uma string.' })
  @MaxLength(255, { message: 'O nome do produto deve ter no máximo 255 caracteres.' })
  name: string;

  @IsNotEmpty({ message: 'A descrição do produto é obrigatória.' })
  @IsString({ message: 'A descrição do produto deve ser uma string.' })
  @MaxLength(500, { message: 'A descrição do produto deve ter no máximo 500 caracteres.' })
  description: string;

  @IsNotEmpty({ message: 'O preço do produto é obrigatório.' })
  @IsNumber({}, { message: 'O preço do produto deve ser um número.' })
  @Min(0, { message: 'O preço do produto não pode ser negativo.' })
  price: number;

  @IsNotEmpty({ message: 'O estoque do produto é obrigatório.' })
  @IsNumber({}, { message: 'O estoque do produto deve ser um número inteiro.' })
  @Min(0, { message: 'O estoque do produto não pode ser negativo.' })
  stock: number;
}
