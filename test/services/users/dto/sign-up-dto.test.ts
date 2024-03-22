import { validate } from 'class-validator';
import { SignUpRequestDto } from '../../../../src/services/users/dto/sign-up-dto';

describe('SignUpDto 테스트', () => {
  describe('request dto 테스트', () => {
    test('올바른 값일때 검증이 성공한다', async () => {
      const dto = new SignUpRequestDto({
        email: 'test@test.com',
        nickName: 'test',
        password: 'test1234!@#$',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });
  });
});
