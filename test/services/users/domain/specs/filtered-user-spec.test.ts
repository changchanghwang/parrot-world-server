import { EntityManager } from 'typeorm';
import { UserRepository } from '@users/infrastructure/repository';
import { FilteredUserSpec } from '@users/domain/specs';

jest.mock('@users/infrastructure/repository');

describe('FilteredUserSpec 테스트', () => {
  const userRepository = jest.mocked(new UserRepository({} as EntityManager));
  test('repository에 생성자에 받은 데이터를 전달한다.', async () => {
    userRepository.find.mockResolvedValue([]);
    const spec = new FilteredUserSpec({ ids: ['test'] });
    await spec.find(userRepository, {});
    expect(userRepository.find.mock.calls[0][0]).toEqual({ ids: ['test'] });
  });
});
