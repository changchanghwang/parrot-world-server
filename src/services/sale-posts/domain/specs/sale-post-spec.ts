import type { FindOptions } from '@libs/orm';
import type { User } from '@users/domain/model';
import type { SalePostRepository } from '../../infrastructure/repository';
import type { SalePost } from '../model';

export abstract class SalePostSpec {
  private user?: User;

  constructor({ user }: { user?: User }) {
    this.user = user;
  }

  abstract find(salePostRepository: SalePostRepository, options?: FindOptions): Promise<SalePost[]>;

  abstract count(salePostRepository: SalePostRepository): Promise<number>;

  isAdmin() {
    return this.user?.isAdmin();
  }

  isAuthor(authorId: string) {
    return this.user?.id === authorId;
  }
}
