import { passwordRegex } from '../../../src/libs/regex';

describe('Regex Test', () => {
  describe('passwordRegex test', () => {
    test('passwordRegex는 8~16자리의 영문, 숫자, 특수문자를 포함한 문자열이어야 한다.', () => {
      expect(passwordRegex.test('test1234!@')).toBe(true);
      expect(passwordRegex.test('test1234')).toBe(false);
      expect(passwordRegex.test('test!@')).toBe(false);
      expect(passwordRegex.test('test1234!@test1234!@')).toBe(false);
    });
  });
});
