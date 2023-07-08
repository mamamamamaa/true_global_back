import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../schemas/categoty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [],
})
export class CategoryModule {}
