import { Injectable } from '@nestjs/common';
import { Repository } from '@libs/ddd';
import { type FindOptions, type FindOrder, convertOptions } from '@libs/orm';
import { omit } from 'lodash';
import { Article, SearchKey } from '../domain/model';
import type { ArticleSpec } from '../domain/specs/article-spec';
import { badRequest } from '../../../libs/exceptions';

@Injectable()
export class ArticleRepository extends Repository<Article, Article['id']> {
  entityClass = Article;

  async find(
    conditions: { ids?: string[]; categoryCode?: string; userId?: string; search?: { key: SearchKey; value: string } },
    options?: FindOptions,
    order?: FindOrder,
  ) {
    const queryBuilder = this.getQueryBuilder(conditions);
    const { skip, take, lock } = convertOptions(options);

    if (order) {
      Object.entries(order.order).forEach(([key, value]) => {
        queryBuilder.addOrderBy(`article.${key}`, value);
      });
    }

    if (lock) {
      queryBuilder.setLock(lock.mode);
    }

    return queryBuilder.skip(skip).take(take).getMany();
  }

  async findSpec(spec: ArticleSpec, options?: FindOptions) {
    return spec.find(this, options);
  }

  async count(conditions: {
    ids?: string[];
    categoryCode?: string;
    userId?: string;
    search?: { key: SearchKey; value: string };
  }) {
    return this.getQueryBuilder(conditions).getCount();
  }

  async countSpec(spec: ArticleSpec) {
    return spec.count(this);
  }

  private getQueryBuilder(conditions: {
    ids?: string[];
    categoryCode?: string;
    userId?: string;
    search?: { key: SearchKey; value: string };
  }) {
    const queryBuilder = this.getManager().createQueryBuilder(this.entityClass, 'article');

    if (conditions.search) {
      switch (conditions.search.key) {
        case 'title':
          queryBuilder.andWhere('article.title LIKE :title', { title: `%${conditions.search.value}%` });
          break;
        case 'withContent':
          queryBuilder.andWhere('article.content LIKE :content OR article.title LIKE :title', {
            content: `%${conditions.search.value}%`,
            title: `%${conditions.search.value}%`,
          });
          break;
        case 'author':
          queryBuilder.andWhere('article.userId = :userId', { userId: conditions.search.value });
          break;
        default:
          throw badRequest(`Invalid search key: ${conditions.search.key}`);
      }
    }

    const filteredConditions = omit(conditions, 'search');
    Object.entries(filteredConditions).forEach(([key, value]) => {
      queryBuilder.andWhere(`article.${key} = :${key}`, { [key]: value });
    });

    return queryBuilder;
  }
}
