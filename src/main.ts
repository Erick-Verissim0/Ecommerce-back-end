import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './domain/config/swagger/setup';
import { config } from './domain/config/environment/enviroment.confg';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const getConfig = await config();
  const port = getConfig.port;

  const app = await NestFactory.create(AppModule);
  const prefix = 'api';
  setupSwagger(prefix, app);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}
bootstrap();
