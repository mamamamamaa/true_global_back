import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TaskService } from './task.service';
import { TaskGuard } from './task.guard';

@Controller('task')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':categoryId')
  @UseGuards(TaskGuard)
  getTasks(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return true;
  }

  @Post(':categoryId')
  addTask(@Param('categoryId', ParseIntPipe) categoryId: number) {}
}
