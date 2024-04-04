import type { User } from '@users/domain/model';
import type { FindOptions } from '../../../../libs/orm';
import type { CommentRepository } from '../../infrastructure/repository';
import type { Comment } from '../model';
import { CommentSpec } from './comment-spec';
import { forbidden } from '../../../../libs/exceptions';

export class DeletableCommentSpec extends CommentSpec {
  private id: string;

  constructor({ user, id }: { user: User; id: string }) {
    super({ user });
    this.id = id;
  }

  async find(commentRepository: CommentRepository, options: FindOptions): Promise<Comment[]> {
    const [comment] = await commentRepository.find({ ids: [this.id] }, options);

    if (this.isAdmin() || this.isAuthor(comment.userId)) {
      return [comment];
    }

    throw forbidden(`User is not allowed to delete the comment(${this.id}).`, {
      errorMessage: '삭제할 수 있는 권한이 없습니다.',
    });
  }
}
