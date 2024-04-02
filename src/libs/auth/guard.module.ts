import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@users/application/service';
import { UserRepository } from '@users/infrastructure/repository';
import { ValidateUserService } from '@users/domain/services/validate-user-service';
import { AuthGuard } from './guard';

@Global()
@Module({
  providers: [AuthGuard, JwtService, UserService, UserRepository, ValidateUserService],
  exports: [AuthGuard, JwtService, UserService, UserRepository, ValidateUserService],
})
export class GuardModule {}
