import type { FindOptions } from '@libs/orm';
import { forbidden } from '@libs/exceptions';
import { VerificationRepository } from '../../infrastructure/repository';
import { VerificationSpec } from './verification-spec';

export class ValidVerificationSpec implements VerificationSpec {
  private id: string;

  constructor({ id }: { id: string }) {
    this.id = id;
  }

  async find(verificationRepository: VerificationRepository, options?: FindOptions) {
    const [verification] = await verificationRepository.find({ ids: [this.id] }, options);

    if (!verification) {
      return [];
    }

    if (verification.expiredAt! < new Date()) {
      throw forbidden(`Verification(${verification.id}) is expired.`, {
        errorMessage: '인증코드를 재요청 해주세요.',
      });
    }

    if (verification.verifiedAt) {
      throw forbidden(`Verification(${verification.id}) is already verified.`, {
        errorMessage: '인증코드를 재요청 해주세요.',
      });
    }

    return [verification];
  }
}
