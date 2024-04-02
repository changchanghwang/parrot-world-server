import { Injectable } from '@nestjs/common';
import { Repository } from '@libs/ddd';
import { FindOptions, FindOrder, convertOptions } from '@libs/orm';
import { Article } from '../domain/model';

@Injectable()
export class ArticleRepository extends Repository<Article, Article['id']> {
  entityClass = Article;

  async find(conditions: { categoryCode?: string; authorId?: string }, options?: FindOptions, order?: FindOrder) {
    return this.getManager().find(this.entityClass, {
      where: { categoryCode: conditions.categoryCode, authorId: conditions.authorId },
      ...convertOptions(options),
      ...order,
    });
  }
}
