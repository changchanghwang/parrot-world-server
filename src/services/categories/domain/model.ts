import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Aggregate } from '@libs/ddd';

type CtorType = {
  name: string;
  tier: number;
  code: string;
};

@Entity()
export class Category extends Aggregate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  tier!: number;

  @Column()
  code!: string;

  constructor(args: CtorType) {
    super();
    if (args) {
      this.name = args.name;
      this.tier = args.tier;
      this.code = args.code;
    }
  }

  static from(args: { name: string; tier: number; code: string }) {
    return new Category(args);
  }
}
