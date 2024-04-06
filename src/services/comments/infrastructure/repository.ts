import { Injectable } from '@nestjs/common';
import { Repository } from '@libs/ddd';
import { FindOptions, FindOrder, InValues, convertOptions } from '@libs/orm';
import { Comment } from '../domain/model';
import { CommentSpec } from '../domain/specs/comment-spec';

@Injectable()
export class CommentRepository extends Repository<Comment, string> {
  entityClass = Comment;

  async find(conditions: { ids?: string[]; articleId?: string }, options?: FindOptions, order?: FindOrder) {
    return this.getManager().find(this.entityClass, {
      where: { id: InValues(conditions.ids), articleId: conditions.articleId },
      ...convertOptions(options),
      ...order,
    });
  }

  async findSpec(spec: CommentSpec, options?: FindOptions) {
    return spec.find(this, options);
  }
}
