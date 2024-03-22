import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Aggregate } from '@libs/ddd';
import { monotonicFactory } from 'ulidx';
import { add } from '../../../libs/date';
import { badRequest } from '../../../libs/exceptions';

export const verificationType = ['SIGNUP'] as const;
export type VerificationType = (typeof verificationType)[number];

type CtorType = {
  to: string;
  code: string;
  type: VerificationType;
};

@Entity()
export class Verification extends Aggregate {
  @PrimaryColumn()
  id!: string;

  @Column()
  to!: string;

  @Column()
  code!: string;

  @Column({ nullable: true })
  expiredAt?: Date;

  @Column()
  type!: VerificationType;

  @Column({ nullable: true })
  sentAt?: Date;

  @Column({ nullable: true })
  verifiedAt?: Date;

  constructor(args: CtorType) {
    super();
    if (args) {
      this.id = monotonicFactory()();
      this.to = args.to;
      this.code = args.code;
      this.type = args.type;
    }
  }

  static from({ to, type }: { to: string; type: VerificationType }) {
    const code = `${Math.floor(Math.random() * 900000) + 100000}`;
    return new Verification({ to, code, type });
  }

  sent() {
    const expiredAt = (() => {
      switch (this.type) {
        case 'SIGNUP':
          return add({ date: new Date(), value: 3, unit: 'minutes', timezone: 'UTC' });
        default:
          throw badRequest(`Invalid verification type: ${this.type}`, {
            errorMessage: '허용되지 않은 인증 타입입니다.',
          });
      }
    })();

    this.expiredAt = expiredAt;
    this.sentAt = new Date();
  }
}
