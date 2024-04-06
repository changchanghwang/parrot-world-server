import { Article } from '@articles/domain/model';
import { monotonicFactory } from 'ulidx';
import { articleOf } from '..';

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
        userId: 'test',
        categoryCode: 'test',
        fileIds: [],
      });
      expect(article).toBeInstanceOf(Article);
      expect(article).toEqual({
        id: 'test',
        title: 'test',
        content: 'test',
        userId: 'test',
        categoryCode: 'test',
        fileIds: [],
      });
    });
  });

  describe('update test', () => {
    test('parameter로 들어온 변경된 값을 업데이트 할 수 있다.', () => {
      const article = articleOf({
        title: 'testTitle',
        content: 'testContent',
      });

      article.update({
        content: 'test content',
      });

      expect(article.content).toBe('test content');
    });
  });
});
