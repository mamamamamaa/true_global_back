import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CategoryService } from '../category/category.service';

@Injectable()
export class TaskGuard implements CanActivate {
  constructor(private readonly categoryService: CategoryService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { id } = request.user;
    const { categoryId } = request.params;

    const userCategory = await this.categoryService.checkUserCategory(
      id,
      +categoryId,
    );

    if (!userCategory)
      throw new HttpException(
        `Category ID ${categoryId} is not assigned to this user`,
        HttpStatus.NOT_FOUND,
      );

    request['category'] = userCategory;

    return true;
  }
}
