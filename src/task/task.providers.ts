import { DataSource } from 'typeorm';
import { Task } from './task.entity';
import { DATABASE_PROVIDER, TASK_PROVIDER } from '../consts/database';

export const taskProviders = [
  {
    provide: TASK_PROVIDER,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
    inject: [DATABASE_PROVIDER],
  },
];
