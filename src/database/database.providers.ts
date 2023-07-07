import { DataSource } from 'typeorm';
import {
  CONNECTION_TIMEOUT_IN_SECONDS,
  DATABASE_PROVIDER,
} from '../consts/database';

export const databaseProviders = [
  {
    provide: DATABASE_PROVIDER,
    useFactory: async () => {
      const {
        DB_USERNAME: username,
        DB_PORT,
        DB_PASSWORD: password,
      } = process.env;

      const port = Number(DB_PORT);

      while (true) {
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            host: 'localhost',
            port,
            username,
            password,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
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
