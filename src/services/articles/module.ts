import { Module } from '@nestjs/common';
import { ArticleController } from './presentation/controller';
import { ArticleService } from './application/service';
import { ArticleRepository } from './infrastructure/repository';
import { FileModule } from '../files/module';

@Module({
  imports: [FileModule],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRepository],
  exports: [],
})
export class ArticleModule {}
