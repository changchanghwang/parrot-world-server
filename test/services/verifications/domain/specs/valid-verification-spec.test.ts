import { EntityManager } from 'typeorm';
import { VerificationRepository } from '@verifications/infrastructure/repository';
import { ValidVerificationSpec } from '@verifications/domain/specs';
import { forbidden } from '@libs/exceptions';
import { verificationOf } from '../..';

jest.mock('@verifications/infrastructure/repository');

describe('Valid Verification Spec Test', () => {
  const verificationRepository = jest.mocked(new VerificationRepository({} as EntityManager));
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2024-03-22T00:00:00.000Z'));
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
  test('해당하는 아이디의 verification이 없으면 빈 배열을 반환한다.', async () => {
    verificationRepository.find.mockResolvedValue([]);
    const spec = new ValidVerificationSpec({ id: 'test' });

    const result = await spec.find(verificationRepository);
    expect(result).toEqual([]);
  });

  test('verification이 만료되었다면 에러를 던진다.', async () => {
    verificationRepository.find.mockResolvedValue([
      verificationOf({ id: 'test', expiredAt: new Date('2024-03-21T00:00:00.000Z') }),
    ]);
    const spec = new ValidVerificationSpec({ id: 'test' });
    expect.assertions(1);
    try {
      await spec.find(verificationRepository);
    } catch (e) {
      expect(e).toEqual(
        forbidden(`Verification(test) is expired.`, {
          errorMessage: '인증코드를 재요청 해주세요.',
        }),
      );
    }
  });

  test('verification이 이미 인증되었다면 에러를 던진다.', async () => {
    verificationRepository.find.mockResolvedValue([
      verificationOf({ id: 'test', verifiedAt: new Date('2024-03-22T00:00:00.000Z') }),
    ]);
    const spec = new ValidVerificationSpec({ id: 'test' });
    expect.assertions(1);
    try {
      await spec.find(verificationRepository);
    } catch (e) {
      expect(e).toEqual(
        forbidden(`Verification(test) is already verified.`, {
          errorMessage: '인증코드를 재요청 해주세요.',
        }),
      );
    }
  });
});
