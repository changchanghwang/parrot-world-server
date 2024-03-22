import { Module } from '@nestjs/common';
import { HealthModule } from '@libs/health';
import { DatabaseModule } from '@libs/datasource';
import { UserModule } from '@users/module';
import { VerificationModule } from '@verifications/module';

@Module({
  imports: [DatabaseModule, HealthModule, UserModule, VerificationModule],
})
export class AppModule {}
