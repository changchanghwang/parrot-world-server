import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Aggregate, SoftDeletable } from '@libs/ddd';
import { monotonicFactory } from 'ulidx';

type CtorType = {
  title: string;
  content: string;
  userId: string;
  categoryCode: CategoryCode;
  fileIds?: string[];
};

type UpdateArgs = {
  title?: string;
  content?: string;
  categoryCode?: string;
  fileIds?: string[];
};

export enum CategoryCode {
  ANNOUNCEMENT = '000000000',
  FREE = '000010001',
}

export const searchKey = ['title', 'withContent', 'author'] as const;
export type SearchKey = (typeof searchKey)[number];

@Entity()
@SoftDeletable()
export class Article extends Aggregate {
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column()
  userId!: string;

  @Column()
  categoryCode!: CategoryCode;

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

  static from(args: {
    title: string;
    content: string;
    userId: string;
    categoryCode: CategoryCode;
    fileIds?: string[];
  }) {
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
