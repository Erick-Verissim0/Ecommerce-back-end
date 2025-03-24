import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty({
    message: 'O campo "e-mail" não pode ser DE FORMA ALGUMA VAZIO!',
  })
  email: string;

  @IsString({
    message: 'Sua senha DEVE conter letras, número e caracteres especiais!',
  })
  password: string;
}
