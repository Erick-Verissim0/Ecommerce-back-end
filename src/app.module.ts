import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './domain/database.module';
import { ControllersModule } from './presentation/controllers/controllers.module';
import { AuthModule } from './infraestructure/services/auth.module';

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
