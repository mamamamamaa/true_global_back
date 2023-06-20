import { DataSource } from 'typeorm';
import { Category } from './categoty.entity';
import { CATEGORY_PROVIDER, DATABASE_PROVIDER } from '../conts/database';

export const categoryProviders = [
  {
    provide: CATEGORY_PROVIDER,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
    inject: [DATABASE_PROVIDER],
  },
];
