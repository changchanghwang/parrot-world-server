import { Article } from '@articles/domain/model';
import { monotonicFactory } from 'ulidx';

jest.mock('ulidx');

describe('Article Model Test', () => {
  beforeEach(() => {
    const mockUlId = monotonicFactory as jest.Mock<() => string>;
    mockUlId.mockImplementation(() => () => 'test');
  });

  describe('from test', () => {
    test('Article 인스턴스를 생성할 수 있다.', () => {
      const article = Article.from({
        title: 'test',
        content: 'test',
        authorId: 'test',
        categoryCode: 'test',
        fileIds: [],
      });
      expect(article).toBeInstanceOf(Article);
      expect(article).toEqual({
        id: 'test',
        title: 'test',
        content: 'test',
        authorId: 'test',
        categoryCode: 'test',
        fileIds: [],
      });
    });
  });
});
