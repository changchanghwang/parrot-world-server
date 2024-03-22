import { stripUndefined } from '@libs/common';

describe('Common Test', () => {
  describe('StripUndefined Test', () => {
    test('stripUndefined 메서드는 undefined를 제거한다.', () => {
      const obj = {
        a: 'test',
        b: undefined,
        c: 'test',
      };
      expect(stripUndefined(obj)).toEqual({
        a: 'test',
        c: 'test',
      });
    });
    test('stripUndefined 메서드는 모든 값이 undefined일 때, undefined를 반환한다.', () => {
      const obj = {
        a: undefined,
        b: undefined,
        c: undefined,
      };
      expect(stripUndefined(obj)).toBeUndefined();
    });
  });
});
