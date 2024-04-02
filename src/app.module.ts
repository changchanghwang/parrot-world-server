import { Module } from '@nestjs/common';
import { HealthModule } from '@libs/health';
import { DatabaseModule } from '@libs/datasource';
import { UserModule } from '@users/module';
import { VerificationModule } from '@verifications/module';
import { GuardModule } from '@libs/auth';
import { ArticleModule } from '@articles/module';
import { CategoryModule } from '@categories/module';
import { FileModule } from '@files/module';

@Module({
  imports: [
    DatabaseModule,
    HealthModule,
    UserModule,
    VerificationModule,
    ArticleModule,
    CategoryModule,
    GuardModule,
    FileModule,
  ],
})
export class AppModule {}
