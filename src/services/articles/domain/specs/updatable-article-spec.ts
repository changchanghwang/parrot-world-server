import type { User } from '@users/domain/model';
import type { FindOptions } from '../../../../libs/orm';
import type { ArticleRepository } from '../../infrastructure/repository';
import type { Article } from '../model';
import { ArticleSpec } from './article-spec';
import { forbidden } from '../../../../libs/exceptions';

export class UpdatableArticleSpec extends ArticleSpec {
  private id: string;

  constructor({ user, id }: { user: User; id: string }) {
    super({ user });
    this.id = id;
  }

  async find(articleRepository: ArticleRepository, options: FindOptions): Promise<Article[]> {
    const [article] = await articleRepository.find({ ids: [this.id] }, options);

    if (this.isAdmin() || this.isAuthor(article.authorId)) {
      return [article];
    }

    throw forbidden(`User is not allowed to update the article(${this.id}).`, {
      errorMessage: '수정할 수 있는 권한이 없습니다.',
    });
  }
}
