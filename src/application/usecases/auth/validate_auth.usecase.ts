import { Injectable } from '@nestjs/common';
import { ValidateAuthInterface } from 'src/domain/repository/auth/validate_auth.interface';
import { AuthService } from 'src/infraestructure/services/auth/auth.service';
import { AuthInterface } from 'src/presentation/interface/auth/validate_auth.interface';

@Injectable()
export class ValidateAuthUseCase implements ValidateAuthInterface {
  constructor(private readonly authService: AuthService) {}

  async execute(token: string): Promise<AuthInterface> {
    return await this.authService.validateAuth(token);
  }
}
