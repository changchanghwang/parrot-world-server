import * as bcrypt from 'bcrypt';

const salt = process.env.SALT!;

export async function hashPassword(password: string) {
  return bcrypt.hash(password, Number(salt));
}
