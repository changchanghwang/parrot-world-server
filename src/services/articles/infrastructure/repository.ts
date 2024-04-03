import { Injectable } from '@nestjs/common';
import { Repository } from '@libs/ddd';
import { type FindOptions, type FindOrder, convertOptions, InValues } from '@libs/orm';
import { Article } from '../domain/model';
import type { ArticleSpec } from '../domain/specs/article-spec';

@Injectable()
export class ArticleRepository extends Repository<Article, Article['id']> {
  entityClass = Article;

  async find(
    conditions: { ids: string[]; categoryCode?: string; authorId?: string },
    options?: FindOptions,
    order?: FindOrder,
  ) {
    return this.getManager().find(this.entityClass, {
      where: { categoryCode: conditions.categoryCode, authorId: conditions.authorId, id: InValues(conditions.ids) },
      ...convertOptions(options),
      ...order,
    });
  }

  async findSpec(spec: ArticleSpec, options?: FindOptions) {
    return spec.find(this, options);
  }
}
