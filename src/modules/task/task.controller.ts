import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TaskService } from './task.service';
import { TaskGuard } from './task.guard';
import { TaskDto } from './dto/task.dto';
import { RequestWithCategory } from '../../types/request.interface';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Controller('task')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':categoryId')
  @UseGuards(TaskGuard)
  getTasks(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.taskService.getTasksByCategory(categoryId);
  }

  @Post(':categoryId')
  @UseGuards(TaskGuard)
  addTask(@Req() { category }: RequestWithCategory, @Body() dto: TaskDto) {
    return this.taskService.createTask(category, dto);
  }

  @Delete(':taskId')
  deleteTask(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.taskService.removeTask(taskId);
  }

  @Patch(':taskId')
  updateTask(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(taskId, dto);
  }
}
