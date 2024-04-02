import { plainToClass } from '@libs/test';
import { Category } from '@categories/domain/model';

export function categoryOf({ id, name, tier, code }: { id?: number; name?: string; tier?: number; code?: string }) {
  return plainToClass(Category, {
    id: id ?? 1,
    name: name ?? 'test',
    tier: tier ?? 1,
    code: code ?? 'test',
  });
}
