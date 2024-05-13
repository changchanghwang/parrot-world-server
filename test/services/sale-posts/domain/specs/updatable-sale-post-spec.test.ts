import { EntityManager } from 'typeorm';
import { SalePostRepository } from '@sale-posts/infrastructure/repository';
import { UpdatableSalePostSpec } from '@sale-posts/domain/specs';
import { forbidden } from '@libs/exceptions';
import { userOf } from '../../../users';
import { salePostOf } from '../..';

jest.mock('@sale-posts/infrastructure/repository');

describe('UpdatableSalePostSpec 테스트', () => {
  const salePostRepository = jest.mocked(new SalePostRepository({} as EntityManager));
  describe('find test', () => {
    describe('권한 테스트', () => {
      test('관리자의 경우 salePost를 반환한다.', async () => {
        const adminUser = userOf({ role: 'ADMIN', id: 'adminId' });
        salePostRepository.find.mockResolvedValue([salePostOf({ id: 'salePostId', userId: 'userId' })]);

        const spec = new UpdatableSalePostSpec({ user: adminUser, id: 'salePostId' });

        const salePost = await spec.find(salePostRepository, {});

        expect(salePost).toEqual([
          {
            userId: 'userId',
            content: 'test',
            fileIds: [],
            id: 'salePostId',
            thumbnailId: 'test',
            title: 'test',
            price: {
              amount: 1000,
              currency: '원',
            },
            type: 'sale',
          },
        ]);
      });

      test('관리자가 아닌 경우 작성자만 salePost를 반환한다.', async () => {
        const author = userOf({ role: 'USER', id: 'userId' });
        salePostRepository.find.mockResolvedValue([salePostOf({ id: 'salePostId', userId: 'userId' })]);

        const spec = new UpdatableSalePostSpec({ user: author, id: 'salePostId' });

        const salePost = await spec.find(salePostRepository, {});

        expect(salePost).toEqual([
          {
            userId: 'userId',
            content: 'test',
            fileIds: [],
            id: 'salePostId',
            title: 'test',
            thumbnailId: 'test',
            price: {
              amount: 1000,
              currency: '원',
            },
            type: 'sale',
          },
        ]);
      });

      test('작성자가 아닌 경우 에러를 던져야 한다.', async () => {
        const user = userOf({ role: 'USER', id: 'userId' });
        salePostRepository.find.mockResolvedValue([salePostOf({ id: 'salePostId', userId: 'authorId' })]);

        const spec = new UpdatableSalePostSpec({ user, id: 'salePostId' });

        expect.assertions(1);
        try {
          await spec.find(salePostRepository, {});
        } catch (err) {
          expect(err).toEqual(
            forbidden(`User is not allowed to update the salePost(salePostId).`, {
              errorMessage: '수정할 수 있는 권한이 없습니다.',
            }),
          );
        }
      });
    });
  });
});
