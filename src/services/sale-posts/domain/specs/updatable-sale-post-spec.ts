import type { User } from '@users/domain/model';
import type { FindOptions } from '../../../../libs/orm';
import type { SalePostRepository } from '../../infrastructure/repository';
import type { SalePost } from '../model';
import { forbidden, notImplemented } from '../../../../libs/exceptions';
import { SalePostSpec } from './sale-post-spec';

export class UpdatableSalePostSpec extends SalePostSpec {
  private id: string;

  constructor({ user, id }: { user: User; id: string }) {
    super({ user });
    this.id = id;
  }

  async find(salePostRepository: SalePostRepository, options: FindOptions): Promise<SalePost[]> {
    const [salePost] = await salePostRepository.find({ ids: [this.id] }, options);

    if (this.isAdmin() || this.isAuthor(salePost.userId)) {
      return [salePost];
    }

    throw forbidden(`User is not allowed to update the salePost(${this.id}).`, {
      errorMessage: '수정할 수 있는 권한이 없습니다.',
    });
  }

  async count(_: SalePostRepository): Promise<number> {
    throw notImplemented(`${this.constructor.name}.count is not implemented.`);
  }
}
