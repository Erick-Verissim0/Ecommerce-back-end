import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ControllersModule } from './presentation/controllers/controllers.module';
import { DatabaseModule } from './infraestructure/database.module';
import { AuthModule } from './infraestructure/auth/auth.module';
import { InfrastructureModule } from './infraestructure/infraestructure.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    DatabaseModule,
    InfrastructureModule,
    AuthModule,
    ControllersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
