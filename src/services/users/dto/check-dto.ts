import { IsNotEmpty, IsString } from 'class-validator';

export class CheckRequestDto {
  @IsNotEmpty()
  @IsString()
  nickName!: string;

  constructor(args: { nickName: string }) {
    if (args) {
      this.nickName = args.nickName;
    }
  }
}
