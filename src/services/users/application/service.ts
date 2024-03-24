import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApplicationService } from '@libs/ddd';
import { hashPassword } from '@libs/hash';
import { UserRepository } from '../infrastructure/repository';
import { User } from '../domain/model';
import { SignUpRequestDto, SignUpResponseDto } from '../dto/sign-up-dto';
import { ValidateUserService } from '../domain/services/validate-user-service';
import { SignInResponseDto } from '../dto/sing-in-dto';

@Injectable()
export class UserService extends ApplicationService {
  constructor(
    private userRepository: UserRepository,
    private validateUserService: ValidateUserService,
    private jwtService: JwtService,
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
    const accessToken = this.jwtService.sign({ id: user.id }, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign({}, { expiresIn: '30d' });

    user.update({ refreshToken });

    await this.userRepository.save([user]);

    return SignUpResponseDto.from({ email, accessToken, refreshToken });
  }

  async signIn({ email, password }: { email: string; password: string }) {
    const [user] = await this.userRepository.find({ email });
    if (!user) {
      throw new Error('User not found');
    }
    user.validatePassword(password);

    const accessToken = this.jwtService.sign({ id: user.id }, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign({}, { expiresIn: '30d' });

    user.update({ refreshToken });

    await this.userRepository.save([user]);

    return SignInResponseDto.from({ email, accessToken, refreshToken });
  }

  async checkDuplicated({ nickName }: { nickName: string }) {
    return this.validateUserService.checkDuplicated({ nickName });
  }
}
