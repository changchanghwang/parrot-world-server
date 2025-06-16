import { Module } from '@nestjs/common';
import { HealthModule } from '@libs/health';
import { DatabaseModule } from '@libs/datasource';
import { UserModule } from '@users/module';
import { VerificationModule } from '@verifications/module';
import { GuardModule } from '@libs/auth';
import { ArticleModule } from '@articles/module';
import { CategoryModule } from '@categories/module';
import { FileModule } from '@files/module';
import { CommentModule } from '@comments/module';
import { SalePostModule } from '@sale-posts/module';

@Module({
  imports: [
    ArticleModule,
    CategoryModule,
    CommentModule,
    FileModule,
    SalePostModule,
    UserModule,
    VerificationModule,
    DatabaseModule,
    HealthModule,
    GuardModule,
  ],
})
export class AppModule {}
