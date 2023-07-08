import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (configService: ConfigService) => ({
    type: 'postgres',
    host: 'localhost',
    port: configService.get<number>('DB_PORT'),
    password: configService.get<string>('DB_PASSWORD'),
    username: configService.get<string>('DB_USERNAME'),
    database: configService.get<string>('DB_NAME'),
    logging: true,
    synchronize: true,
    autoLoadEntities: true,
    retryAttempts: 30,
    retryDelay: 10000,
  }),
  inject: [ConfigService],
};
