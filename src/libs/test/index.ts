import * as ct from 'class-transformer';

type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K }[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

/**
 * @param classType
 * @param plain
 */
export const plainToClass = <T>(classType: new (...args: any[]) => T, plain: NonFunctionProperties<T>) => {
  return ct.plainToClass(classType, plain);
};
