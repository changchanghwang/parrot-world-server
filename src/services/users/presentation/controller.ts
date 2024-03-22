import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { validate } from 'class-validator';
import { badRequest } from '@libs/exceptions';
import { UserService } from '../application/service';
import { SignUpRequestDto } from '../dto/sign-up-dto';
import { SignInRequestDto } from '../dto/sing-in-dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  @HttpCode(201)
  async signUp(@Body() body: SignUpRequestDto) {
    await this.userService.signUp(body);
  }

  @Post('/sign-in')
  async signIn(@Body() body: SignInRequestDto, @Res() res: Response) {
    const data = await this.userService.signIn(body);

    res.cookie('accessToken', `Bearer ${data.accessToken}`, { maxAge: 1000 * 60 * 60, signed: true });
    res.cookie('refreshToken', `Bearer ${data.refreshToken}`, { maxAge: 1000 * 60 * 60 * 24 * 30, signed: true });

    const errors = await validate(data);

    if (errors.length > 0) {
      const messege = errors.map((error) => error.constraints);
      throw badRequest(JSON.stringify(messege), {
        errorMessage: '유저 정보가 올바르지 않습니다.',
      });
    }

    res.status(200).json(data.email);
  }
}
