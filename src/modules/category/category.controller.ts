import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/CreateCategory.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { Payload } from '../../types/jwt.types';

@Controller('category')
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategories(@Req() { user }: Request) {
    const { id } = user as Payload;
    return this.categoryService.getUserCategories(id);
  }

  @Post()
  createCategory(@Body() dto: CreateCategoryDto, @Req() { user }: Request) {
    const { id } = user as Payload;
    return this.categoryService.createCategory(dto, id);
  }
}
