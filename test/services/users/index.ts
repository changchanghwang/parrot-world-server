import { User, UserRole } from '@users/domain/model';
import { plainToClass } from '@libs/test';

export function userOf({
  id,
  nickName,
  email,
  password,
  role,
  refreshToken,
}: {
  id?: string;
  nickName?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  refreshToken?: string;
}) {
  return plainToClass(User, {
    id: id ?? 'test',
    nickName: nickName ?? 'test',
    email: email ?? 'test@test.com',
    password: password ?? 'test',
    role: role ?? ('USER' as const),
    refreshToken: refreshToken ?? 'test',
  });
}
