import { fileOf } from '..';
import { badRequest } from '../../../../src/libs/exceptions';

describe('File Model Test', () => {
  describe('commit test', () => {
    test('isCommitted가 true로 변경되어야 한다.', () => {
      const file = fileOf({ isCommitted: false });
      file.commit();
      expect(file.isCommitted).toBe(true);
    });
  });

  describe('validate test', () => {
    test('isCommitted가 false일 경우 에러를 던져야 한다.', () => {
      const file = fileOf({ id: '123.jpg', isCommitted: false });

      try {
        file.validate();
      } catch (err) {
        expect(err).toEqual(
          badRequest(`File(123.jpg) is not committed`, {
            errorMessage: '예상하지 못한 에러가 발생했습니다. 다음에 다시 시도해주세요.',
          }),
        );
      }
    });
  });
});
