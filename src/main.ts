import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const config = await app.get(ConfigService);
  const port = (await config.get<number>('APP_PORT')) || 7777;

  await app.listen(port, () =>
    console.log(`Server is running on port ${port}`),
  );
}
bootstrap();
