import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { DATABASE_PROVIDER, USER_PROVIDER } from '../conts/database';

export const userProviders = [
  {
    provide: USER_PROVIDER,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATABASE_PROVIDER],
  },
];
