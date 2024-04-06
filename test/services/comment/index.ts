import { plainToClass } from '@libs/test';
import { Comment } from '@comments/domain/model';

export function commentOf({
  id,
  content,
  userId,
  articleId,
}: {
  id?: string;
  content?: string;
  userId?: string;
  articleId?: string;
}) {
  return plainToClass(Comment, {
    id: id ?? 'commentId',
    content: content ?? 'test',
    userId: userId ?? 'userId',
    articleId: articleId ?? 'articleId',
  });
}
