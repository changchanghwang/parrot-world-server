import type { User } from '@users/domain/model';
import type { FindOptions } from '../../../../libs/orm';
import type { ArticleRepository } from '../../infrastructure/repository';
import type { Article } from '../model';
import { ArticleSpec } from './article-spec';

export class FilteredArticleSpec extends ArticleSpec {
  private categoryCode?: string;

  constructor({ user, categoryCode }: { user?: User; categoryCode?: string }) {
    super({ user });
    this.categoryCode = categoryCode;
  }

  async find(articleRepository: ArticleRepository, options: FindOptions): Promise<Article[]> {
    return articleRepository.find({ categoryCode: this.categoryCode }, options);
  }

  async count(articleRepository: ArticleRepository): Promise<number> {
    return articleRepository.count({ categoryCode: this.categoryCode });
  }
}
