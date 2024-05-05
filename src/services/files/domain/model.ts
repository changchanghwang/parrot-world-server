import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Aggregate } from '../../../libs/ddd';
import { badRequest } from '../../../libs/exceptions';

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

  validate() {
    if (!this.isCommitted) {
      throw badRequest(`File(${this.id}) is not committed`, {
        errorMessage: '예상하지 못한 에러가 발생했습니다. 다음에 다시 시도해주세요.',
      });
    }
  }
}
