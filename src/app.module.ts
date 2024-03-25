import { Module } from '@nestjs/common';
import { HealthModule } from '@libs/health';
import { DatabaseModule } from '@libs/datasource';
import { UserModule } from '@users/module';
import { VerificationModule } from '@verifications/module';
import { ArticleModule } from './services/articles/module';
import { CategoryModule } from './services/categories/module';

@Module({
  imports: [DatabaseModule, HealthModule, UserModule, VerificationModule, ArticleModule, CategoryModule],
})
export class AppModule {}
