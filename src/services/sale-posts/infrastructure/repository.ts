import { Injectable } from '@nestjs/common';
import { Repository } from '@libs/ddd';
import { type FindOptions, type FindOrder, convertOptions, InValues } from '@libs/orm';
import { SalePost, type SaleType } from '../domain/model';

@Injectable()
export class SalePostRepository extends Repository<SalePost, SalePost['id']> {
  entityClass = SalePost;

  async find(
    conditions: { ids?: string[]; userId?: string; types: SaleType[] },
    options?: FindOptions,
    order?: FindOrder,
  ) {
    return this.getManager().find(SalePost, {
      where: {
        id: InValues(conditions.ids),
        userId: conditions.userId,
        type: InValues(conditions.types),
      },
      ...convertOptions(options),
      ...order,
    });
  }

  async count(conditions: { ids?: string[]; userId?: string; types: SaleType[] }) {
    return this.getManager().count(SalePost, {
      where: {
        id: InValues(conditions.ids),
        userId: conditions.userId,
        type: InValues(conditions.types),
      },
    });
  }

  // async findSpec(spec: SalePostSpec, options?: FindOptions) {
  //   return spec.find(this, options);
  // }

  // async countSpec(spec: SalePostSpec) {
  //   return spec.count(this);
  // }
}
