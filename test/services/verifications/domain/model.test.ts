import { Verification } from '@verifications/domain/model';
import { monotonicFactory } from 'ulidx';
import { verificationOf } from '..';

jest.mock('ulidx');

describe('Verification Model Test', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2024-03-22T00:00:00.000Z'));
    const mockUlId = monotonicFactory as jest.Mock<() => string>;
    mockUlId.mockImplementation(() => () => 'test');
    jest.spyOn(global.Math, 'random').mockReturnValue(0.9);
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.spyOn(global.Math, 'random').mockRestore();
  });
  describe('from Test', () => {
    test('from 메서드는 verification를 반환한다.', () => {
      const verification = Verification.from({ to: 'test', type: 'SIGNUP' });

      expect(verification).toBeInstanceOf(Verification);
      expect(verification).toEqual({
        id: 'test',
        to: 'test',
        code: '910000',
        type: 'SIGNUP',
      });
    });
  });

  describe('sent Test', () => {
    test('type이 SIGNUP일 때, expiredAt은 3분 후의 시간이다.', () => {
      const verification = verificationOf({ type: 'SIGNUP' });
      verification.sent();
      expect(verification.expiredAt).toEqual(new Date('2024-03-22T00:03:00.000Z'));
    });

    test('sentAt에 현재 시간을 기록한다.', () => {
      const verification = verificationOf({ type: 'SIGNUP' });
      verification.sent();
      expect(verification.sentAt).toEqual(new Date('2024-03-22T00:00:00.000Z'));
    });
  });
});
