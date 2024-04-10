import type { FindOptions } from '@libs/orm';
import type { UserRepository } from '../../infrastructure/repository';
import { UserSpec } from './user-spec';

export class FilteredUserSpec extends UserSpec {
  private ids?: string[];

  constructor({ ids }: { ids?: string[] }) {
    super();
    this.ids = ids;
  }

  async find(userRepository: UserRepository, options: FindOptions) {
    return userRepository.find({ ids: this.ids }, options);
  }

  async count(userRepository: UserRepository) {
    return userRepository.count({ ids: this.ids });
  }
}
