import type { FindOptions } from '@libs/orm';
import type { User } from '@users/domain/model';
import type { CommentRepository } from '../../infrastructure/repository';
import type { Comment } from '../model';

export abstract class CommentSpec {
  private user: User;

  constructor({ user }: { user: User }) {
    this.user = user;
  }

  abstract find(articleRepository: CommentRepository, options?: FindOptions): Promise<Comment[]>;

  isAdmin() {
    return this.user.isAdmin();
  }

  isAuthor(articleId: string) {
    return this.user.id === articleId;
  }
}
