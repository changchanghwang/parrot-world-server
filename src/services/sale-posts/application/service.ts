import { Injectable } from '@nestjs/common';
import { ApplicationService } from '@libs/ddd';
import { User } from '@users/domain/model';
import { SalePostRepository } from '../infrastructure/repository';
import { SalePost, SaleType } from '../domain/model';
import { Money } from '../../value-objects';

@Injectable()
export class SalePostService extends ApplicationService {
  constructor(private salePostRepository: SalePostRepository) {
    super();
  }

  async create(
    { user }: { user: User },
    {
      title,
      content,
      fileIds,
      type,
      price,
      thumbnailId,
    }: { title: string; content: string; fileIds?: string[]; type: SaleType; price: number; thumbnailId: string },
  ) {
    const salePost = SalePost.from({
      title,
      content,
      userId: user.id,
      fileIds,
      type,
      price: Money.of({ amount: price, currency: '원' }),
      thumbnailId,
    });
    await this.salePostRepository.save([salePost]);
    return salePost;
  }
}
