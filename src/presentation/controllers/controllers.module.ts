import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { ApplicationModule } from 'src/application/application.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from 'src/infraestructure/services/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ApplicationModule],
  providers: [AuthService, JwtService],
  controllers: [UsersController, AuthController],
})
export class ControllersModule {}
