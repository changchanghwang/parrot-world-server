import type { FindOptions } from '@libs/orm';
import type { User } from '@users/domain/model';
import type { ArticleRepository } from '../../infrastructure/repository';
import type { Article } from '../model';

export abstract class ArticleSpec {
  private user?: User;

  constructor({ user }: { user?: User }) {
    this.user = user;
  }

  abstract find(articleRepository: ArticleRepository, options?: FindOptions): Promise<Article[]>;

  abstract count(articleRepository: ArticleRepository): Promise<number>;

  isAdmin() {
    return this.user?.isAdmin();
  }

  isAuthor(authorId: string) {
    return this.user?.id === authorId;
  }
}
