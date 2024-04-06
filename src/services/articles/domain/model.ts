import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Aggregate } from '@libs/ddd';
import { monotonicFactory } from 'ulidx';

type CtorType = {
  title: string;
  content: string;
  userId: string;
  categoryCode: string;
  fileIds?: string[];
};

type UpdateArgs = {
  title?: string;
  content?: string;
  categoryCode?: string;
  fileIds?: string[];
};

@Entity()
export class Article extends Aggregate {
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  userId!: string;

  @Column()
  categoryCode!: string;

  @Column({ type: 'simple-array' })
  fileIds!: string[];

  constructor(args: CtorType) {
    super();
    if (args) {
      this.id = monotonicFactory()();
      this.title = args.title;
      this.content = args.content;
      this.userId = args.userId;
      this.categoryCode = args.categoryCode;
      this.fileIds = args.fileIds ?? [];
    }
  }

  static from(args: { title: string; content: string; userId: string; categoryCode: string; fileIds?: string[] }) {
    return new Article(args);
  }

  update(args: UpdateArgs) {
    const updatedArgs: UpdateArgs | undefined = this.stripUnchanged(args);
    if (!updatedArgs) {
      return;
    }

    Object.assign(this, updatedArgs);
  }
}
