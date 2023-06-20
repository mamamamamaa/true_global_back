import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = await app.get(ConfigService);
  const port = await config.get<number>('APP_PORT');

  await app.listen(port || 7777, () =>
    console.log(`Server is running on port ${port}`),
  );
}
bootstrap();
