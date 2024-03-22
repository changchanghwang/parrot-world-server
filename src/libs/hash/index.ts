import * as bcrypt from 'bcrypt';

const salt = process.env.SALT!;

export async function hashPassword(password: string) {
  return bcrypt.hash(password, Number(salt));
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
