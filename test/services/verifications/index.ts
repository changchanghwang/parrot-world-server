import { plainToClass } from '@libs/test';
import { Verification, type VerificationType } from '@verifications/domain/model';

export function verificationOf({
  id,
  to,
  code,
  type,
  expiredAt,
  sentAt,
  verifiedAt,
}: {
  id?: string;
  to?: string;
  code?: string;
  type?: VerificationType;
  expiredAt?: Date;
  sentAt?: Date;
  verifiedAt?: Date;
}) {
  return plainToClass(Verification, {
    id: id ?? 'test',
    to: to ?? 'test',
    code: code ?? '910000',
    type: type ?? 'SIGNUP',
    expiredAt,
    sentAt,
    verifiedAt,
  });
}
