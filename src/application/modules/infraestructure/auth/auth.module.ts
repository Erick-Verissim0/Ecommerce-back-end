import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/infraestructure/config/environment/enviroment.confg';
import { ValidateAuthUseCase } from 'src/application/usecases/auth/validate_auth.usecase';
import { AuthService } from 'src/infraestructure/services/auth/auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => {
        const envConfig = await config();
        return {
          secret: envConfig.jwtSecret,
          signOptions: { expiresIn: '24h' },
        };
      },
    }),
  ],
  providers: [AuthService, ValidateAuthUseCase],
  exports: [AuthService, ValidateAuthUseCase],
})
export class AuthModule {}
