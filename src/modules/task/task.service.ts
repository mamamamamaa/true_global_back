import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../schemas/task.entity';
import { Repository } from 'typeorm';
import { Category } from '../../schemas/categoty.entity';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  getTasksByCategory(categoryId: number) {
    return this.taskRepository.findBy({ category: { id: categoryId } });
  }

  async createTask(category: Category, taskDto: TaskDto) {
    const { raw } = await this.taskRepository
      .createQueryBuilder()
      .insert()
      .values({ ...taskDto, category })
      .returning('*')
      .execute();

    return raw.at(0);
  }

  async updateTask(taskId: number, updateTaskDto: UpdateTaskDto) {
    const { raw } = await this.taskRepository
      .createQueryBuilder()
      .update()
      .set(updateTaskDto)
      .where('id = :id', { taskId })
      .returning('*')
      .execute();

    return raw.at(0);
  }

  async removeTask(taskId: number) {
    const { raw } = await this.taskRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { taskId })
      .returning('*')
      .execute();

    return raw.at(0);
  }
}
