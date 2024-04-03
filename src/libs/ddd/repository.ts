import { Injectable } from '@nestjs/common';
import { EntityManager, type ObjectType } from 'typeorm';
import { isSoftDeletable, type Aggregate } from './aggregate';
import { notFoundEntity } from '../exceptions';
import { InValues } from '../orm';

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
    await (isSoftDeletable(entity) ? this.entityManager.softRemove(entity) : this.entityManager.remove(entity));
  }

  async findOneOrFail(id: ID) {
    const [entity] = await this.findByIds([id]);
    if (!entity) {
      throw notFoundEntity(`Entity(${this.entityClass.name}) not found. Id: '${id}'`);
    }
    return entity;
  }

  async findByIds(ids: ID[]) {
    // @ts-expect-error
    return this.entityManager.findBy(this.entityClass, { id: InValues(ids) });
  }
}
