import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { categoryProviders } from '../../schemas/category/category.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...categoryProviders],
})
export class CategoryModule {}
