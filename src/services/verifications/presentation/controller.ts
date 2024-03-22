import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { validate } from 'class-validator';
import { badRequest } from '@libs/exceptions';
import { VerificationService } from '../application/service';
import { SendEmailVerificationRequestDto, SendEmailVerificationResponseDto } from '../dto/send-email-verification-dto';
import { ConfirmEmailVerificationRequestDto } from '../dto/confrim-email-verification-dto';

@Controller('verifications')
export class VerificationController {
  constructor(private verificationService: VerificationService) {}

  @Post('/emails')
  @HttpCode(200)
  async sendEmailVerification(@Body() body: SendEmailVerificationRequestDto) {
    const { to, type } = body;
    const result = await this.verificationService.start({ email: to, type });

    const data = SendEmailVerificationResponseDto.from(result);
    const errors = await validate(data);

    if (errors.length > 0) {
      const message = errors.map((error) => error.constraints);
      throw badRequest(JSON.stringify(message));
    }

    return { data };
  }

  @Post('/emails/:id')
  @HttpCode(200)
  async confirmEmailVerification(@Param() param: { id: string }, @Body() body: ConfirmEmailVerificationRequestDto) {
    const { id } = param;
    const { code } = body;
    await this.verificationService.confirm(id, { code });
  }
}
