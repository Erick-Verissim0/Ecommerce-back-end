import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ValidateAuthUseCase } from 'src/application/usecases/auth/validate_auth.usecase';
import { AuthInterface } from 'src/presentation/interface/auth/validate_auth.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private validateAuthUseCase: ValidateAuthUseCase) {}

  @Post()
  async auth(@Body() { token }): Promise<AuthInterface> {
    return await this.validateAuthUseCase.execute(token);
  }
}
