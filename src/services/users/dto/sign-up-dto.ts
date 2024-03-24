import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { passwordRegex } from '@libs/regex';

export class SignUpRequestDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  nickName!: string;

  @IsNotEmpty()
  @IsString()
  @Matches(passwordRegex, { message: '비밀번호는 8~16자의 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.' })
  password!: string;

  constructor(args: { email: string; nickName: string; password: string }) {
    if (args) {
      this.email = args.email;
      this.nickName = args.nickName;
      this.password = args.password;
    }
  }
}

export class SignUpResponseDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  accessToken!: string;

  @IsNotEmpty()
  @IsString()
  refreshToken!: string;

  constructor(args: { email: string; accessToken: string; refreshToken: string }) {
    if (args) {
      this.email = args.email;
      this.accessToken = args.accessToken;
      this.refreshToken = args.refreshToken;
    }
  }

  static from(args: { email: string; accessToken: string; refreshToken: string }) {
    return new SignUpResponseDto(args);
  }
}
