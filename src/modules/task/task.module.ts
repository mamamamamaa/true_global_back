import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../../schemas/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [],
})
export class TaskModule {}
