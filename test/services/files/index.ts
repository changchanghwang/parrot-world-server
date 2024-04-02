import { plainToClass } from '@libs/test';
import { File } from '@files/domain/model';

export function fileOf({
  id,
  name,
  contentType,
  path,
  isCommitted,
}: {
  id?: string;
  name?: string;
  contentType?: string;
  path?: string;
  isCommitted?: boolean;
}) {
  return plainToClass(File, {
    id: id ?? 'test',
    name: name ?? 'test.jpg',
    contentType: contentType ?? 'test',
    path: path ?? 'test',
    isCommitted: isCommitted ?? false,
  });
}
