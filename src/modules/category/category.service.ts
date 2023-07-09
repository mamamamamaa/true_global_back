import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../schemas/categoty.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateCategoryDto } from './dto/CreateCategory.dto';

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

  createCategory({ name }: CreateCategoryDto, userId: number) {}
}
