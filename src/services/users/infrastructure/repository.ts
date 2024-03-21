import { Repository } from '@libs/ddd';
import { Injectable } from '@nestjs/common';
import { User } from '../domain/model';

@Injectable()
export class UserRepository extends Repository<User> {
  entityClass = User;

  async find(conditions: { email?: string; nickName?: string }) {
    return this.getManager().find(User, {
      where: {
        email: conditions.email,
        nickName: conditions.nickName,
      },
    });
  }
}
