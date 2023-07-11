import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../../schemas/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CategoryModule } from '../category/category.module';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), CategoryModule, UserModule],
  providers: [TaskService, JwtService],
  controllers: [TaskController],
})
export class TaskModule {}
