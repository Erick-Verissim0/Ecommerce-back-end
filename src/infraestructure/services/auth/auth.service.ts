import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from 'src/infraestructure/config/environment/enviroment.confg';
import { AuthInterface } from 'src/presentation/interface/auth/validate_auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: {
    id: number;
    name: string;
    email: string;
    type: string;
  }): string {
    return this.jwtService.sign(payload);
  }

  async validateAuth(token: string): Promise<AuthInterface> {
    const envConfig = await config();

    try {
      const payload = this.jwtService.verify<AuthInterface>(token, {
        secret: envConfig.jwtSecret,
      });

      return {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        type: payload.type,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
