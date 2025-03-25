import { IsInt, IsNotEmpty } from 'class-validator';

export class GetProductByIdDto {
  @IsInt({ message: 'O ID deve ser um número inteiro' })
  @IsNotEmpty({ message: 'O ID é obrigatório' })
  id: number;
}
