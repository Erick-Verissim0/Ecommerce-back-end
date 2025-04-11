import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ControllersModule } from './presentation/controllers/controllers.module';
import { AuthModule } from './infraestructure/services/auth/auth.module';
import { DatabaseModule } from './infraestructure/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    DatabaseModule,
    AuthModule,
    ControllersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
