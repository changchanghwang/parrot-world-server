import { Repository } from '@libs/ddd';
import { Injectable } from '@nestjs/common';
import { FindOptions, FindOrder, convertOptions } from '@libs/orm';
import { User } from '../domain/model';

@Injectable()
export class UserRepository extends Repository<User> {
  entityClass = User;

  async find(conditions: { email?: string; nickName?: string }, options?: FindOptions, order?: FindOrder) {
    return this.getManager().find(User, {
      where: {
        email: conditions.email,
        nickName: conditions.nickName,
      },
      ...convertOptions(options),
      ...order,
    });
  }
}
