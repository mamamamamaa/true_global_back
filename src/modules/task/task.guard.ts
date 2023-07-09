import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CategoryService } from '../category/category.service';

@Injectable()
export class TaskGuard implements CanActivate {
  constructor(private readonly categoryService: CategoryService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user } = context.switchToHttp().getRequest();

    const { id } = user;

    return true;
  }
}
