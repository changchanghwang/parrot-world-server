import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmEmailVerificationRequestDto {
  @IsNotEmpty()
  @IsString()
  code!: string;
}
