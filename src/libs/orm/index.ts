import { In } from 'typeorm';

export type FindOptions = {
  page?: number;
  limit?: number;
  lock?: { mode: 'pessimistic_write' | 'pessimistic_read' };
};

export type FindOrder = {
  order: {
    [prop: string]: 'DESC' | 'ASC';
  };
};

export const convertOptions = (options?: FindOptions) => {
  if (!options) {
    return {};
  }
  return {
    take: options?.limit,
    skip: options?.page && ((options.page || 1) - 1) * (options.limit || 1),
    lock: options?.lock,
  };
};

export function InValues<T>(values?: T[]) {
  return values && In(values);
}
