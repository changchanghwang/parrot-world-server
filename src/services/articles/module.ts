import { Module } from '@nestjs/common';
import { ArticleController } from './presentation/controller';
import { ArticleService } from './application/service';
import { ArticleRepository } from './infrastructure/repository';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRepository],
  exports: [],
})
export class ArticleModule {}
