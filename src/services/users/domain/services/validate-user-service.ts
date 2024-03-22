import { Injectable } from '@nestjs/common';
import { badRequest } from '@libs/exceptions';
import { UserRepository } from '../../infrastructure/repository';

@Injectable()
export class ValidateUserService {
  constructor(private userRepository: UserRepository) {}

  async validateSignUp({ email, nickName }: { email: string; nickName: string }) {
    const emailDuplicatedUsers = await this.userRepository.find({ email });
    if (emailDuplicatedUsers.length) {
      throw badRequest(`User email(${email}) already exists.`, {
        errorMessage: '해당 이메일로 가입된 사용자가 이미 존재합니다.',
      });
    }

    const nickNameDuplicatedUsers = await this.userRepository.find({ nickName });
    if (nickNameDuplicatedUsers.length) {
      throw badRequest(`User nickName(${nickName}) already exists.`, {
        errorMessage: '해당 닉네임으로 가입된 사용자가 이미 존재합니다.',
      });
    }
  }
}
