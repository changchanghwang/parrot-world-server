import { Category } from '@categories/domain/model';

describe('Category Test', () => {
  describe('from 테스트', () => {
    test('Category 객체를 반환한다.', () => {
      const category = Category.from({
        name: 'category1',
        tier: 1,
        code: '010000000',
      });

      expect(category).toBeInstanceOf(Category);
      expect(category).toEqual({
        name: 'category1',
        tier: 1,
        code: '010000000',
      });
    });
  });
});
