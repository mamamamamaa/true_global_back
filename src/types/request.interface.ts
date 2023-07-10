import { Category } from '../schemas/categoty.entity';

export interface RequestWithCategory extends Request {
  category: Category;
}
