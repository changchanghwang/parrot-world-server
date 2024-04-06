import { Injectable } from '@nestjs/common';
import { ApplicationService } from '@libs/ddd';
import { User } from '@users/domain/model';
import { CommentRepository } from '../infrastructure/repository';
import { Comment } from '../domain/model';
import { DeletableCommentSpec, UpdatableCommentSpec } from '../domain/specs';

@Injectable()
export class CommentService extends ApplicationService {
  constructor(private commentRepository: CommentRepository) {
    super();
  }

  async create({ user }: { user: User }, { content, articleId }: { content: string; articleId: string }) {
    const comment = new Comment({ userId: user.id, content, articleId });
    await this.commentRepository.save([comment]);
  }

  async update({ user }: { user: User }, articleId: string, { content }: { content?: string }) {
    const [comment] = await this.commentRepository.findSpec(new UpdatableCommentSpec({ user, id: articleId }));
    comment.update({ content });
    await this.commentRepository.save([comment]);
    return comment;
  }

  async delete({ user }: { user: User }, articleId: string) {
    const [comment] = await this.commentRepository.findSpec(new DeletableCommentSpec({ user, id: articleId }));
    await this.commentRepository.remove(comment);
  }
}
