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
    return this.categoryRepository.findBy({ user: { id: userId } });
  }

  async createCategory(categoryDto: CategoryDto, userId: number) {
    const categoryOwner = await this.userService.findUser({ id: userId });

    const { raw } = await this.categoryRepository
      .createQueryBuilder()
      .insert()
      .values({ ...categoryDto, user: categoryOwner })
      .returning('*')
      .execute();

    return raw.at(0);
  }

  async updateCategoryName(id: number, { name }: CategoryDto) {
    const { raw } = await this.categoryRepository
      .createQueryBuilder()
      .update()
      .set({ name })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    return raw.at(0);
  }

  async removeCategory(id: number) {
    const { raw } = await this.categoryRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .returning('*')
      .execute();

    return raw.at(0);
  }
}
