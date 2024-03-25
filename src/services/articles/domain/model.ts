import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Aggregate } from '@libs/ddd';
import { monotonicFactory } from 'ulidx';

type CtorType = {
  title: string;
  content: string;
  authorId: string;
  categoryCode: string;
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
  authorId!: string;

  @Column()
  categoryCode!: string;

  @Column()
  fileIds!: string[];

  constructor(args: CtorType) {
    super();
    if (args) {
      this.id = monotonicFactory()();
      this.title = args.title;
      this.content = args.content;
      this.authorId = args.authorId;
      this.categoryCode = args.categoryCode;
      this.fileIds = args.fileIds ?? [];
    }
  }

  static from(args: { title: string; content: string; authorId: string; categoryCode: string; fileIds?: string[] }) {
    return new Article(args);
  }
}
