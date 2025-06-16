import { plainToClass } from '@libs/test';
import { SalePost, SaleType } from '@sale-posts/domain/model';
import { Money } from '@value-objects';

export function salePostOf({
  id,
  title,
  content,
  userId,
  fileIds,
  type,
  price,
  thumbnailId,
}: {
  id?: string;
  title?: string;
  content?: string;
  userId?: string;
  fileIds?: string[];
  type?: SaleType;
  price?: Money;
  thumbnailId?: string;
}) {
  return plainToClass(SalePost, {
    id: id ?? 'test',
    title: title ?? 'test',
    content: content ?? 'test',
    userId: userId ?? 'test',
    fileIds: fileIds ?? [],
    type: type ?? 'sale',
    price: price ?? plainToClass(Money, { amount: 1000, currency: '원' }),
    thumbnailId: thumbnailId ?? 'test',
  });
}
