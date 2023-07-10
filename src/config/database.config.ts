import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (configService: ConfigService) => ({
    type: configService.get<any>('DB_TYPE'),
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    password: configService.get<string>('DB_PASSWORD'),
    username: configService.get<string>('DB_USERNAME'),
    database: configService.get<string>('DB_NAME'),
    synchronize: true,
    autoLoadEntities: true,
    retryAttempts: 30,
    retryDelay: 10000,
  }),
  inject: [ConfigService],
};
