import { DataSource } from 'typeorm';
import { DATABASE_PROVIDER } from '../conts/database';

export const databaseProviders = [
  {
    provide: DATABASE_PROVIDER,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        logging: true,
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
