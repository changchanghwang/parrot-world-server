import { plainToClass } from '@libs/test';
import { Article, CategoryCode } from '@articles/domain/model';

export function articleOf({
  id,
  title,
  content,
  userId,
  categoryCode,
  fileIds,
}: {
  id?: string;
  title?: string;
  content?: string;
  userId?: string;
  categoryCode?: CategoryCode;
  fileIds?: string[];
}) {
  return plainToClass(Article, {
    id: id ?? 'test',
    title: title ?? 'test',
    content: content ?? 'test',
    userId: userId ?? 'test',
    categoryCode: categoryCode ?? CategoryCode.ANNOUNCEMENT,
    fileIds: fileIds ?? [],
  });
}
