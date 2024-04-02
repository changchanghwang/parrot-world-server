import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Aggregate } from '../../../libs/ddd';

@Entity()
export class File extends Aggregate {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  contentType!: string;

  @Column()
  path!: string;

  @Column()
  isCommitted!: boolean;

  constructor(args: { id: string; name: string; contentType: string; path: string }) {
    super();
    if (args) {
      this.id = args.id;
      this.name = args.name;
      this.contentType = args.contentType;
      this.path = args.path;
      this.isCommitted = false;
    }
  }

  commit() {
    this.isCommitted = true;
  }
}
