import { fileOf } from '..';

describe('File Model Test', () => {
  describe('commit test', () => {
    test('isCommitted가 true로 변경되어야 한다.', () => {
      const file = fileOf({ isCommitted: false });
      file.commit();
      expect(file.isCommitted).toBe(true);
    });
  });
});
