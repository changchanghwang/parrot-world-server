import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import type { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(error: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = error.getStatus();

    // TODO: use logger
    console.error(error);

    response.status(status).json({
      // @ts-expect-error
      errorMessage: error.getResponse().errorMessage || '예상치 못한 에러가 발생했습니다. 다음에 다시 시도해주세요.',
    });
  }
}
