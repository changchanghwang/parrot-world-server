import { EntityManager } from 'typeorm';
import { ValidateUserService } from '@users/domain/services/validate-user-service';
import { UserRepository } from '@users/infrastructure/repository';
import { badRequest } from '@libs/exceptions';
import { userOf } from '../..';

jest.mock('@users/infrastructure/repository');

describe('Validate User Service Test', () => {
  const userRepository = jest.mocked(new UserRepository({} as EntityManager));
  const validateUserService = new ValidateUserService(userRepository);

  describe('checkDuplicatedNickName Text', () => {
    test('닉네임이 중복되면 true를 반환한다.', async () => {
      userRepository.find.mockResolvedValueOnce([userOf({ nickName: 'test' })]);
      const result = await validateUserService.checkDuplicatedNickName('test');
      expect(result).toBe(true);
    });
    test('닉네임이 중복되지 않으면 false를 반환한다.', async () => {
      userRepository.find.mockResolvedValueOnce([]);
      const result = await validateUserService.checkDuplicatedNickName('test');
      expect(result).toBe(false);
    });
  });

  describe('validateSignUp Test', () => {
    test('이메일이 중복되면 에러를 던진다.', async () => {
      userRepository.find.mockResolvedValueOnce([userOf({ email: 'test' })]);
      expect.assertions(1);
      try {
        await validateUserService.validateSignUp({ email: 'test', nickName: 'test' });
      } catch (e) {
        expect(e).toEqual(
          badRequest(`User email(test) already exists.`, {
            errorMessage: '해당 이메일로 가입된 사용자가 이미 존재합니다.',
          }),
        );
      }
    });

    test('닉네임이 중복되면 에러를 던진다.', async () => {
      userRepository.find.mockResolvedValueOnce([]);
      userRepository.find.mockResolvedValueOnce([userOf({ nickName: 'test' })]);
      expect.assertions(1);
      try {
        await validateUserService.validateSignUp({ email: 'test', nickName: 'test' });
      } catch (e) {
        expect(e).toEqual(
          badRequest(`User nickName(test) already exists.`, {
            errorMessage: '해당 닉네임으로 가입된 사용자가 이미 존재합니다.',
          }),
        );
      }
    });
  });
});
