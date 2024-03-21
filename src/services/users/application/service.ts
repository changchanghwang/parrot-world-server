import { Injectable } from '@nestjs/common';
import { ApplicationService } from '@libs/ddd';
import { hashPassword } from '@libs/hash';
import { UserRepository } from '../infrastructure/repository';
import { User } from '../domain/model';
import { SignUpRequestDto } from '../dto/sign-up-dto';
import { ValidateUserService } from '../domain/services/validate-user-service';

@Injectable()
export class UserService extends ApplicationService {
  constructor(
    private userRepository: UserRepository,
    private validateUserService: ValidateUserService,
  ) {
    super();
  }

  async signUp({ email, nickName, password }: SignUpRequestDto) {
    const hashedPassword = await hashPassword(password);

    const user = await User.from({
      email,
      nickName,
      password: hashedPassword,
      validateUserService: this.validateUserService,
    });
    await this.userRepository.save([user]);
  }
}
