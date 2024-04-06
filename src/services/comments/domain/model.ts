import { Column, Entity, PrimaryColumn } from 'typeorm';
import { monotonicFactory } from 'ulidx';
import { Aggregate } from '@libs/ddd';

type UpdateArgs = {
  content?: string;
};
@Entity()
export class Comment extends Aggregate {
  @PrimaryColumn()
  id!: string;

  @Column()
  content!: string;

  @Column()
  articleId!: string;

  @Column()
  userId!: string;

  constructor(args: { content: string; articleId: string; userId: string }) {
    super();
    if (args) {
      this.id = monotonicFactory()();
      this.content = args.content;
      this.articleId = args.articleId;
      this.userId = args.userId;
    }
  }

  update(args: UpdateArgs) {
    const updatedArgs: UpdateArgs | undefined = this.stripUnchanged(args);
    if (!updatedArgs) {
      return;
    }

    Object.assign(this, updatedArgs);
  }
}
