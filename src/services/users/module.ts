import { Module } from '@nestjs/common';
import { UserController } from './presentation/controller';
import { UserService } from './application/service';
import { UserRepository } from './infrastructure/repository';
import { ValidateUserService } from './domain/services/validate-user-service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository, ValidateUserService],
})
export class UserModule {}
