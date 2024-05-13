import { Column, Entity, PrimaryColumn } from 'typeorm';
import { monotonicFactory } from 'ulidx';
import { Aggregate } from '@libs/ddd';
import { Money } from '@value-objects';

export const saleType = ['sale', 'adoption'] as const;
export type SaleType = (typeof saleType)[number];

@Entity()
export class SalePost extends Aggregate {
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column()
  userId!: string;

  @Column()
  type!: SaleType;

  @Column({ type: 'simple-array' })
  fileIds!: string[];

  @Column(() => Money)
  price!: Money;

  @Column()
  thumbnailId!: string;

  constructor(args: {
    title: string;
    content: string;
    userId: string;
    type: SaleType;
    fileIds?: string[];
    price: Money;
    thumbnailId: string;
  }) {
    super();
    if (args) {
      this.id = monotonicFactory()();
      this.title = args.title;
      this.content = args.content;
      this.userId = args.userId;
      this.type = args.type;
      this.fileIds = args.fileIds ?? [];
      this.price = args.price;
      this.thumbnailId = args.thumbnailId;
    }
  }

  static from(args: {
    title: string;
    content: string;
    userId: string;
    type: SaleType;
    fileIds?: string[];
    price: Money;
    thumbnailId: string;
  }) {
    return new SalePost(args);
  }

  update(args: { title?: string; content?: string; fileIds?: string[]; price?: Money; thumbnailId?: string }) {
    const changedArgs = this.stripUnchanged(args);

    if (!changedArgs) return;

    Object.assign(this, changedArgs);
  }
}
