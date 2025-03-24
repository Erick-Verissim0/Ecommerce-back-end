import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'O campo "nome" deve ser do tipo TEXTO!' })
  @IsNotEmpty({ message: 'O campo "nome" não pode ser DE FORMA ALGUMA VAZIO' })
  name: string;

  @IsEmail()
  @IsNotEmpty({
    message: 'O campo "e-mail" não pode ser DE FORMA ALGUMA VAZIO!',
  })
  email: string;

  @IsString({
    message: 'Sua senha DEVE conter letras, número e caracteres especiais!',
  })
  password: string;

  @IsNotEmpty({ message: 'O campo "tipo" não pode ser DE FORMA ALGUMA VAZIO!' })
  @IsEnum(['admin', 'client'], {
    message:
      'O campo "tipo" deve ser um dos valores permitidos: admin ou client!',
  })
  type: 'admin' | 'client';
}
