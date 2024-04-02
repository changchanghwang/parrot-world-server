import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@users/application/service';
import { unauthorized } from '../exceptions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const { accessToken, refreshToken } = req.signedCookies;

    if (refreshToken) {
      const [type, token] = refreshToken.split(' ');
      if (type !== 'Bearer') {
        throw unauthorized(`Token type(${type}) is not 'Bearer'`, { errorMessage: '토큰 타입이 잘못 되었습니다.' });
      }
      const data = await this.userService.reviseToken(token);
      req.state = { user: data.user };

      res.cookie('accessToken', `Bearer ${data.accessToken}`, { signed: true, httpOnly: true });
      res.cookie('refreshToken', `Bearer ${data.refreshToken}`, { signed: true, httpOnly: true });
      return true;
    }

    if (accessToken) {
      try {
        const [type, token] = accessToken.split(' ');
        if (type !== 'Bearer') {
          throw unauthorized(`Token type(${type}) is not 'Bearer'`, { errorMessage: '토큰 타입이 잘못 되었습니다.' });
        }
        const { id } = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
        const user = await this.userService.retrieve(id);
        req.state = { user };
        return true;
      } catch (err) {
        if (err.message === 'jwt expired' && refreshToken) {
          throw unauthorized('Access token expired.', { errorMessage: '토큰이 만료되었습니다.' });
        }
        throw unauthorized(err.message, { errorMessage: '권한 인증에 실패했습니다.' });
      }
    }

    throw unauthorized('Authentication failed.', { errorMessage: '권한 인증에 실패했습니다.' });
  }
}
