import { Injectable } from '@nestjs/common';
import { Repository } from '@libs/ddd';
import { FindOptions, FindOrder, InValues, convertOptions } from '@libs/orm';
import { Verification } from '../domain/model';
import type { VerificationSpec } from '../domain/specs/verification-spec';

@Injectable()
export class VerificationRepository extends Repository<Verification> {
  entityClass = Verification;

  async find(conditions: { ids: Verification['id'][] }, options?: FindOptions, order?: FindOrder) {
    return this.getManager().find(Verification, {
      where: {
        id: InValues(conditions.ids),
      },
      ...convertOptions(options),
      ...order,
    });
  }

  async findSpec(spec: VerificationSpec, options?: FindOptions) {
    return spec.find(this, options);
  }
}
