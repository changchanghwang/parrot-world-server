import type { User } from '@users/domain/model';
import type { FindOptions } from '../../../../libs/orm';
import type { ArticleRepository } from '../../infrastructure/repository';
import type { Article, CategoryCode, SearchKey } from '../model';
import { ArticleSpec } from './article-spec';

export class FilteredArticleSpec extends ArticleSpec {
  private categoryCode?: CategoryCode;

  private search?: { key: SearchKey; value: string };

  constructor({
    user,
    categoryCode,
    search,
  }: {
    user?: User;
    categoryCode?: CategoryCode;
    search?: { key: SearchKey; value: string };
  }) {
    super({ user });
    this.categoryCode = categoryCode;
    this.search = search;
  }

  async find(articleRepository: ArticleRepository, options: FindOptions): Promise<Article[]> {
    return articleRepository.find({ categoryCode: this.categoryCode, search: this.search }, options);
  }

  async count(articleRepository: ArticleRepository): Promise<number> {
    return articleRepository.count({ categoryCode: this.categoryCode, search: this.search });
  }
}
