import { DataSource } from 'typeorm';
import {
  CONNECTION_TIMEOUT_IN_SECONDS,
  DATABASE_PROVIDER,
} from '../../consts/database';
import { User } from '../../schemas/user/user.entity';
import { Category } from '../../schemas/category/categoty.entity';
import { Task } from '../../schemas/task/task.entity';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    inject: [ConfigService],
    provide: DATABASE_PROVIDER,
    useFactory: async (configService: ConfigService) => {
      const port = configService.get<number>('DB_PORT');
      const database = configService.get<string>('DB_NAME');
      const password = configService.get<string>('DB_PASSWORD');
      const username = configService.get<string>('DB_USERNAME');

      while (true) {
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            host: 'localhost',
            port,
            username,
            password,
            database,
            entities: [User, Category, Task],
            logging: true,
            synchronize: true,
          });

          return await dataSource.initialize();
        } catch {
          console.error(
            `Failed to connect to the database. Retry after ${CONNECTION_TIMEOUT_IN_SECONDS} seconds`,
          );
          await new Promise((resolve) =>
            setTimeout(resolve, CONNECTION_TIMEOUT_IN_SECONDS * 1000),
          );
        }
      }
    },
  },
];
