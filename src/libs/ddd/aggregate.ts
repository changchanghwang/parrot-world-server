import { isEqual } from 'lodash';
import { CreateDateColumn, UpdateDateColumn, getMetadataArgsStorage } from 'typeorm';
import { stripUndefined } from '../common';

export abstract class Aggregate {
  @CreateDateColumn()
  private createdAt!: Date;

  @UpdateDateColumn()
  private updatedAt!: Date;

  /**
   * @param changed 변경된 obj
   * @returns Aggregate의 changed를 비교해서 변경된 부분만 반환한다. 바뀐게 없다면 undefined 를 반환한다.
   */
  protected stripUnchanged(changed: { [key: string]: any }) {
    const compared = Object.keys(changed).reduce((acc: { [key: string]: any }, prop) => {
      const originValue = this[prop as keyof typeof this];
      const changedValue = changed[prop];
      acc[prop] = !isEqual(originValue, changedValue) ? changedValue : undefined;
      return acc;
    }, {});

    return stripUndefined(compared);
  }
}

export function SoftDeletable(options?: { propertyName?: string }) {
  return function (ctor: new (...args: any[]) => unknown) {
    getMetadataArgsStorage().columns.push({
      target: ctor,
      propertyName: options?.propertyName || 'deletedAt',
      mode: 'deleteDate',
      options: {},
    });

    ctor.prototype.isSoftDeletable = true;
  };
}

export function isSoftDeletable(aggregate: Aggregate) {
  // @ts-expect-error
  return aggregate.isSoftDeletable;
}
