import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../schemas/categoty.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly userService: UserService,
  ) {}

  getUserCategories(userId: number) {
    return this.categoryRepository
      .createQueryBuilder('category')
      .leftJoin('category.tasks', 'task')
      .select([
        'category.id AS id',
        'category.name AS name',
        'category.date_created AS date_created',
        'CAST(COUNT(task) AS integer) as task_count',
      ])
      .where('category.user.id = :userId', { userId })
      .groupBy('category.id, category.name')
      .getRawMany();
  }

  async createCategory(categoryDto: CategoryDto, userId: number) {
    const categoryOwner = await this.userService.findUser({ id: userId });

    const { raw } = await this.categoryRepository
      .createQueryBuilder('category')
      .insert()
      .values({ ...categoryDto, user: categoryOwner })
      .returning('*')
      .execute();

    const categoryId = raw[0].id;

    const result = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoin('category.tasks', 'task')
      .select('COUNT(task)', 'task_count')
      .where('category.id = :categoryId', { categoryId })
      .addGroupBy('category.id')
      .getRawOne();

    const task_count = result ? parseInt(result.task_count) : 0;

    return { ...raw[0], task_count };
  }

  async updateCategoryName(id: number, { name }: CategoryDto) {
    const { raw } = await this.categoryRepository
      .createQueryBuilder()
      .update()
      .set({ name })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    const result = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoin('category.tasks', 'task')
      .select('COUNT(task)', 'task_count')
      .where('category.id = :id', { id })
      .addGroupBy('category.id')
      .getRawOne();

    const task_count = result ? parseInt(result.task_count) : 0;

    return { ...raw[0], task_count };
  }

  async removeCategory(id: number) {
    const { raw } = await this.categoryRepository
      .createQueryBuilder('category')
      .delete()
      .where('id = :id', { id })
      .returning('*')
      .execute();

    const result = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoin('category.tasks', 'task')
      .select('COUNT(task)', 'task_count')
      .where('category.id = :id', { id })
      .addGroupBy('category.id')
      .getRawOne();

    const task_count = result ? parseInt(result.task_count) : 0;

    return { ...raw[0], task_count };
  }

  checkUserCategory(userId: number, categoryId: number) {
    return this.categoryRepository.findOneBy({
      user: { id: userId },
      id: categoryId,
    });
  }
}
