import type { User } from '@users/domain/model';
import type { FindOptions } from '../../../../libs/orm';
import type { ArticleRepository } from '../../infrastructure/repository';
import type { Article } from '../model';
import { ArticleSpec } from './article-spec';
import { forbidden } from '../../../../libs/exceptions';

export class DeletableArticleSpec extends ArticleSpec {
  private id: string;

  constructor({ user, id }: { user: User; id: string }) {
    super({ user });
    this.id = id;
  }

  async find(articleRepository: ArticleRepository, options: FindOptions): Promise<Article[]> {
    const [article] = await articleRepository.find({ ids: [this.id] }, options);

    if (this.isAdmin() || this.isAuthor(article.userId)) {
      return [article];
    }

    throw forbidden(`User is not allowed to delete the article(${this.id}).`, {
      errorMessage: '삭제할 수 있는 권한이 없습니다.',
    });
  }
}
