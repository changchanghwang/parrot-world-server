import { plainToClass } from '@libs/test';
import { Article } from '@articles/domain/model';

export function articleOf({
  id,
  title,
  content,
  authorId,
  categoryCode,
  fileIds,
}: {
  id?: string;
  title?: string;
  content?: string;
  authorId?: string;
  categoryCode?: string;
  fileIds?: string[];
}) {
  return plainToClass(Article, {
    id: id ?? 'test',
    title: title ?? 'test',
    content: content ?? 'test',
    authorId: authorId ?? 'test',
    categoryCode: categoryCode ?? 'test',
    fileIds: fileIds ?? [],
  });
}
