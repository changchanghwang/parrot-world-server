import { Aggregate } from '@libs/ddd';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { monotonicFactory } from 'ulidx';
import type { ValidateUserService } from './services/validate-user-service';

const userRole = ['ADMIN', 'USER'] as const;
export type UserRole = (typeof userRole)[number];

type CtorType = {
  email: string;
  nickName: string;
  password: string;
};

@Entity()
export class User extends Aggregate {
  @PrimaryColumn()
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  nickName!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  refreshToken?: string;

  @Column()
  role!: UserRole;

  constructor(args: CtorType) {
    super();
    if (args) {
      this.id = monotonicFactory()();
      this.email = args.email;
      this.nickName = args.nickName;
      this.password = args.password;
      this.role = 'USER';
    }
  }

  static async from({
    email,
    nickName,
    password,
    validateUserService,
  }: {
    email: string;
    nickName: string;
    password: string;
    validateUserService: ValidateUserService;
  }) {
    await validateUserService.validateSignUp({ email, nickName });
    return new User({
      email,
      nickName,
      password,
    });
  }

  updateRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}
