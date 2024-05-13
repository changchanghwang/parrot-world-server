import { Module } from '@nestjs/common';
import { SalePostController } from './presentation/controller';
import { SalePostService } from './application/service';
import { SalePostRepository } from './infrastructure/repository';
import { FileModule } from '../files/module';

@Module({
  imports: [FileModule],
  controllers: [SalePostController],
  providers: [SalePostService, SalePostRepository],
  exports: [],
})
export class SalePostModule {}
