import type { FindOptions } from '@libs/orm';
import type { User } from '@users/domain/model';
import { UserRepository } from '../../infrastructure/repository';

export abstract class UserSpec {
  abstract find(articleRepository: UserRepository, options?: FindOptions): Promise<User[]>;

  abstract count(articleRepository: UserRepository): Promise<number>;
}
