import { Repository } from '@libs/ddd';
import { Injectable } from '@nestjs/common';
import { type FindOptions, type FindOrder, convertOptions, InValues } from '@libs/orm';
import { User } from '../domain/model';
import type { UserSpec } from '../domain/specs/user-spec';

@Injectable()
export class UserRepository extends Repository<User, User['id']> {
  entityClass = User;

  async find(
    conditions: { ids?: string[]; email?: string; nickName?: string; refreshToken?: string },
    options?: FindOptions,
    order?: FindOrder,
  ) {
    return this.getManager().find(User, {
      where: {
        id: InValues(conditions.ids),
        email: conditions.email,
        nickName: conditions.nickName,
        refreshToken: conditions.refreshToken,
      },
      ...convertOptions(options),
      ...order,
    });
  }

  async count(conditions: { ids?: string[]; email?: string; nickName?: string; refreshToken?: string }) {
    return this.getManager().count(User, {
      where: {
        id: InValues(conditions.ids),
        email: conditions.email,
        nickName: conditions.nickName,
        refreshToken: conditions.refreshToken,
      },
    });
  }

  async findSpec(spec: UserSpec, options?: FindOptions) {
    return spec.find(this, options);
  }
}
