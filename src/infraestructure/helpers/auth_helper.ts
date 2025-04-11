import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/infraestructure/services/auth/auth.service';
import { RequestWithUser } from 'src/presentation/interface/users/request_with_user';

export class AuthHelper {
  static async validateRequest(
    request: RequestWithUser,
    authService: AuthService,
  ): Promise<void> {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token is required');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Invalid token format');
    }

    try {
      const decoded = await authService.validateAuth(token);

      request.user = decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
