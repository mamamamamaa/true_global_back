import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CategoryService } from '../category/category.service';

@Injectable()
export class TaskGuard implements CanActivate {
  constructor(private readonly categoryService: CategoryService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest();

    const { id } = user;
    const { categoryId } = params;

    const isUserCategory = await this.categoryService.checkUserCategory(
      id,
      +categoryId,
    );

    if (!isUserCategory)
      throw new HttpException(
        `Category ID ${categoryId} is not assigned to this user`,
        HttpStatus.NOT_FOUND,
      );

    return true;
  }
}
