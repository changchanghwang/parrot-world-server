import { Module } from '@nestjs/common';
import { FileController } from './presentation/controller';
import { FileService } from './application/service';
import { FileRepository } from './infrastructure/repository';

@Module({
  controllers: [FileController],
  providers: [FileService, FileRepository],
})
export class FileModule {}
