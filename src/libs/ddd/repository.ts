import { Injectable } from '@nestjs/common';
import { EntityManager, type ObjectType } from 'typeorm';
import type { Aggregate } from './aggregate';
import { notFoundEntity } from '../exceptions';

@Injectable()
export abstract class Repository<T extends Aggregate, ID = number> {
  protected abstract entityClass: ObjectType<T>;

  constructor(private entityManager: EntityManager) {}

  getManager() {
    return this.entityManager;
  }

  async save(entities: T[], txManager?: EntityManager) {
    await (txManager ?? this.entityManager).save(entities, { reload: true });
  }

  async remove(entity: T) {
    await this.entityManager.remove(entity);
  }

  async findOneOrFail(id: ID) {
    // @ts-expect-error
    const entity = await this.entityManager.findOne(this.entityClass, { where: { id } });
    if (!entity) {
      throw notFoundEntity(`Entity(${this.entityClass.name}) not found. Id: '${id}'`);
    }
    return entity;
  }
}
