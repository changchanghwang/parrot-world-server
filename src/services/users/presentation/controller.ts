import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from '../application/service';
import { SignUpRequestDto } from '../dto/sign-up-dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  @HttpCode(201)
  async signUp(@Body() body: SignUpRequestDto) {
    await this.userService.signUp(body);
  }
}
