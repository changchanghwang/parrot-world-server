import { Module } from '@nestjs/common';
import { CategoryRepository } from './infrastructure/repository';

@Module({
  providers: [CategoryRepository],
  exports: [CategoryRepository],
})
export class CategoryModule {}
