import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class PostClientDto {
  @IsNumber({}, { message: 'O campo "user_id" deve ser um número!' })
  @IsNotEmpty({
    message: 'O campo "user_id" não pode ser DE FORMA ALGUMA VAZIO!',
  })
  user_id: number;

  @IsString({ message: 'O campo "nome" deve ser do tipo TEXTO!' })
  @IsNotEmpty({ message: 'O campo "nome" não pode ser DE FORMA ALGUMA VAZIO!' })
  name: string;

  @IsString({ message: 'O campo "contact" deve ser do tipo TEXTO!' })
  @IsNotEmpty({
    message: 'O campo "contact" não pode ser DE FORMA ALGUMA VAZIO!',
  })
  contact: string;

  @IsString({ message: 'O campo "address" deve ser do tipo TEXTO!' })
  @IsNotEmpty({
    message: 'O campo "address" não pode ser DE FORMA ALGUMA VAZIO!',
  })
  address: string;

  @IsBoolean({
    message: 'O campo "status" deve ser um valor booleano (true ou false)!',
  })
  @IsNotEmpty({
    message: 'O campo "status" não pode ser DE FORMA ALGUMA VAZIO!',
  })
  status: boolean;
}
