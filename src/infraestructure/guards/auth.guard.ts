import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthenticatedRequestInterface } from 'src/presentation/interface/auth/authenticated_request.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<AuthenticatedRequestInterface>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Is required "Bearer" in start token');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = await this.authService.validateAuth(token);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
