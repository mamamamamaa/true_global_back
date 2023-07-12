import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const config = await app.get(ConfigService);
  const port = (await config.get<number>('APP_PORT')) || 7777;

  await app.listen(port, () =>
    console.log(`Server is running on port ${port}`),
  );
}
bootstrap();
