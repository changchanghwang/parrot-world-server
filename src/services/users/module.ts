import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './presentation/controller';
import { UserService } from './application/service';
import { UserRepository } from './infrastructure/repository';
import { ValidateUserService } from './domain/services/validate-user-service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, ValidateUserService],
  exports: [UserRepository],
})
export class UserModule {}
