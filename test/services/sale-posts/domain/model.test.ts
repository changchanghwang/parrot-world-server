import { SalePost } from '@sale-posts/domain/model';
import { monotonicFactory } from 'ulidx';
import { Money } from '@value-objects';
import { salePostOf } from '..';

jest.mock('ulidx');

describe('SalePost Model Test', () => {
  beforeEach(() => {
    const mockUlId = monotonicFactory as jest.Mock<() => string>;
    mockUlId.mockImplementation(() => () => 'test');
  });

  describe('from test', () => {
    test('SalePost 인스턴스를 생성할 수 있다.', () => {
      const salePost = SalePost.from({
        title: 'test',
        content: 'test',
        userId: 'test',
        fileIds: [],
        thumbnailId: 'test',
        type: 'sale',
        price: new Money({ amount: 1000, currency: '원' }),
      });
      expect(salePost).toBeInstanceOf(SalePost);
      expect(salePost).toEqual({
        id: 'test',
        title: 'test',
        content: 'test',
        userId: 'test',
        fileIds: [],
        thumbnailId: 'test',
        type: 'sale',
        price: { amount: 1000, currency: '원' },
      });
    });
  });

  describe('update test', () => {
    test('parameter로 들어온 변경된 값을 업데이트 할 수 있다.', () => {
      const salePost = salePostOf({
        title: 'testTitle',
        content: 'testContent',
      });

      salePost.update({
        content: 'test content',
      });

      expect(salePost.content).toBe('test content');
    });
  });
});
