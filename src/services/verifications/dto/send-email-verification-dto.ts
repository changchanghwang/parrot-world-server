import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { VerificationType, verificationType } from '../domain/model';

export class SendEmailVerificationRequestDto {
  @IsNotEmpty()
  @IsEmail()
  to!: string;

  @IsNotEmpty()
  @IsEnum(verificationType, { message: '인증 타입이 올바르지 않습니다.' })
  type!: VerificationType;

  constructor(args: { to: string; type: VerificationType }) {
    if (args) {
      this.to = args.to;
      this.type = args.type;
    }
  }
}

export class SendEmailVerificationResponseDto {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsNotEmpty()
  @IsDate()
  expiredAt!: Date;

  constructor(args: { id: string; expiredAt: Date }) {
    if (args) {
      this.id = args.id;
      this.expiredAt = args.expiredAt;
    }
  }

  static from(args: { id: string; expiredAt: Date }) {
    return new SendEmailVerificationResponseDto(args);
  }
}
