import { Injectable } from '@nestjs/common';
import { Repository } from '@libs/ddd';
import { Category } from '../domain/model';

@Injectable()
export class CategoryRepository extends Repository<Category, Category['id']> {
  entityClass = Category;

  async find(conditions: { code?: string }) {
    return this.getManager().find(Category, {
      where: { code: conditions.code },
    });
  }
}
