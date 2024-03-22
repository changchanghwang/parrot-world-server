import { User } from '@users/domain/model';
import { ValidateUserService } from '@users/domain/services/validate-user-service';
import { UserRepository } from '@users/infrastructure/repository';
import { EntityManager } from 'typeorm';
import { monotonicFactory } from 'ulidx';

jest.mock('../../../../src/services/users/domain/services/validate-user-service');
jest.mock('../../../../src/services/users/infrastructure/repository');
jest.mock('ulidx');

describe('User Model 테스트', () => {
  describe('from 테스트', () => {
    beforeEach(() => {
      const mockUlId = monotonicFactory as jest.Mock<() => string>;
      mockUlId.mockImplementation(() => () => 'test');
    });
    const validateUserService = jest.mocked(new ValidateUserService(new UserRepository({} as EntityManager)));
    test('from 메서드는 User 객체를 생성한다', async () => {
      validateUserService.validateSignUp.mockResolvedValue(undefined);
      const user = await User.from({ email: 'test', password: 'test', nickName: 'test', validateUserService });

      expect(user).toBeInstanceOf(User);
      expect(user).toEqual({
        id: 'test',
        email: 'test',
        password: 'test',
        nickName: 'test',
        role: 'USER',
      });
    });
  });
});
