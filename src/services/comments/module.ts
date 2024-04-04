import { Module } from '@nestjs/common';
import { CommentController } from './presentation/controller';
import { CommentService } from './application/service';
import { CommentRepository } from './infrastructure/repository';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
  exports: [],
})
export class CommentModule {}
