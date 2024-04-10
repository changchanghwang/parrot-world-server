import { EntityManager } from 'typeorm';
import { ArticleRepository } from '@articles/infrastructure/repository';
import { FilteredArticleSpec } from '../../../../../src/services/articles/domain/specs';
import { userOf } from '../../../users';

jest.mock('@articles/infrastructure/repository');

describe('FilteredArticleSpec 테스트', () => {
  const articleRepository = jest.mocked(new ArticleRepository({} as EntityManager));

  describe('find', () => {
    test('repository에 생성자에 받은 데이터를 전달한다.', async () => {
      articleRepository.find.mockResolvedValue([]);
      const adminUser = userOf({ role: 'ADMIN', id: 'adminId' });
      const spec = new FilteredArticleSpec({ user: adminUser, categoryCode: 'test' });
      await spec.find(articleRepository, {});
      expect(articleRepository.find.mock.calls[0][0]).toEqual({ categoryCode: 'test' });
    });
  });

  describe('count', () => {
    test('repository에 생성자에 받은 데이터를 전달한다.', async () => {
      articleRepository.find.mockResolvedValue([]);
      const adminUser = userOf({ role: 'ADMIN', id: 'adminId' });
      const spec = new FilteredArticleSpec({ user: adminUser, categoryCode: 'test' });
      await spec.count(articleRepository);
      expect(articleRepository.count.mock.calls[0][0]).toEqual({ categoryCode: 'test' });
    });
  });
});
