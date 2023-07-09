import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
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
  createCategory(@Body() dto: CategoryDto, @Req() { user }: Request) {
    const { id } = user as Payload;
    return this.categoryService.createCategory(dto, id);
  }

  @Patch(':categoryId')
  updateCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() dto: CategoryDto,
  ) {
    return this.categoryService.updateCategoryName(categoryId, dto);
  }

  @Delete(':categoryId')
  removeCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoryService.removeCategory(categoryId);
  }
}
