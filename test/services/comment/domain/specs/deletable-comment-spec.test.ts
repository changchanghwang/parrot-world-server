import { EntityManager } from 'typeorm';
import { CommentRepository } from '@comments/infrastructure/repository';
import { DeletableCommentSpec } from '@comments/domain/specs';
import { forbidden } from '@libs/exceptions';
import { userOf } from '../../../users';
import { commentOf } from '../..';

jest.mock('@comments/infrastructure/repository');

describe('DeletableCommentSpec 테스트', () => {
  const commentRepository = jest.mocked(new CommentRepository({} as EntityManager));
  describe('find test', () => {
    describe('권한 테스트', () => {
      test('관리자의 경우 comment을 반환한다.', async () => {
        const adminUser = userOf({ role: 'ADMIN', id: 'adminId' });
        commentRepository.find.mockResolvedValue([commentOf({ id: 'commentId', userId: 'userId' })]);

        const spec = new DeletableCommentSpec({ user: adminUser, id: 'commentId' });

        const comment = await spec.find(commentRepository, {});

        expect(comment).toEqual([
          {
            articleId: 'articleId',
            content: 'test',
            id: 'commentId',
            userId: 'userId',
          },
        ]);
      });

      test('관리자가 아닌 경우 작성자만 comment을 반환한다.', async () => {
        const author = userOf({ role: 'USER', id: 'userId' });
        commentRepository.find.mockResolvedValue([commentOf({ id: 'commentId', userId: 'userId' })]);

        const spec = new DeletableCommentSpec({ user: author, id: 'commentId' });

        const comment = await spec.find(commentRepository, {});

        expect(comment).toEqual([
          {
            articleId: 'articleId',
            content: 'test',
            id: 'commentId',
            userId: 'userId',
          },
        ]);
      });

      test('작성자가 아닌 경우 에러를 던져야 한다.', async () => {
        const user = userOf({ role: 'USER', id: 'userId' });
        commentRepository.find.mockResolvedValue([commentOf({ id: 'commentId', userId: 'authorId' })]);

        const spec = new DeletableCommentSpec({ user, id: 'commentId' });

        expect.assertions(1);
        try {
          await spec.find(commentRepository, {});
        } catch (err) {
          expect(err).toEqual(
            forbidden(`User is not allowed to delete the comment(commentId).`, {
              errorMessage: '삭제할 수 있는 권한이 없습니다.',
            }),
          );
        }
      });
    });
  });
});
