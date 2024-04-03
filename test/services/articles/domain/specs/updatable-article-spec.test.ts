import { EntityManager } from 'typeorm';
import { ArticleRepository } from '@articles/infrastructure/repository';
import { userOf } from '../../../users';
import { articleOf } from '../..';
import { UpdatableArticleSpec } from '../../../../../src/services/articles/domain/specs';
import { forbidden } from '../../../../../src/libs/exceptions';

jest.mock('@articles/infrastructure/repository');

describe('UpdatableArticleSpec 테스트', () => {
  const articleRepository = jest.mocked(new ArticleRepository({} as EntityManager));
  describe('find test', () => {
    describe('권한 테스트', () => {
      test('관리자의 경우 article을 반환한다.', async () => {
        const adminUser = userOf({ role: 'ADMIN', id: 'adminId' });
        articleRepository.find.mockResolvedValue([articleOf({ id: 'articleId', authorId: 'authorId' })]);

        const spec = new UpdatableArticleSpec({ user: adminUser, id: 'articleId' });

        const article = await spec.find(articleRepository, {});

        expect(article).toEqual([
          {
            authorId: 'authorId',
            categoryCode: 'test',
            content: 'test',
            fileIds: [],
            id: 'articleId',
            title: 'test',
          },
        ]);
      });

      test('관리자가 아닌 경우 작성자만 article을 반환한다.', async () => {
        const author = userOf({ role: 'USER', id: 'authorId' });
        articleRepository.find.mockResolvedValue([articleOf({ id: 'articleId', authorId: 'authorId' })]);

        const spec = new UpdatableArticleSpec({ user: author, id: 'articleId' });

        const article = await spec.find(articleRepository, {});

        expect(article).toEqual([
          {
            authorId: 'authorId',
            categoryCode: 'test',
            content: 'test',
            fileIds: [],
            id: 'articleId',
            title: 'test',
          },
        ]);
      });

      test('작성자가 아닌 경우 에러를 던져야 한다.', async () => {
        const user = userOf({ role: 'USER', id: 'userId' });
        articleRepository.find.mockResolvedValue([articleOf({ id: 'articleId', authorId: 'authorId' })]);

        const spec = new UpdatableArticleSpec({ user, id: 'articleId' });

        expect.assertions(1);
        try {
          await spec.find(articleRepository, {});
        } catch (err) {
          expect(err).toEqual(
            forbidden(`User is not allowed to update the article(articleId).`, {
              errorMessage: '수정할 수 있는 권한이 없습니다.',
            }),
          );
        }
      });
    });
  });
});
