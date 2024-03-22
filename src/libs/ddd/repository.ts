import { Injectable } from '@nestjs/common';
import { EntityManager, type ObjectType } from 'typeorm';
import type { Aggregate } from './aggregate';

@Injectable()
export abstract class Repository<T extends Aggregate> {
  protected abstract entityClass: ObjectType<T>;

  constructor(private entityManager: EntityManager) {}

  getManager() {
    return this.entityManager;
  }

  async save(entities: T[], txManager?: EntityManager) {
    await (txManager ?? this.entityManager).save(entities, { reload: true });
  }

  public async remove(entity: T) {
    await this.entityManager.remove(entity);
  }
}
