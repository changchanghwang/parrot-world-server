import { Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '../application/service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file', { dest: 'uploads' }))
  async uploadFiles(@UploadedFile() file: Express.Multer.File) {
    await this.fileService.upload({ file });
  }

  @Get('/')
  async getFiles(@Query() query: { ids: string[] }) {
    const { ids } = query;
    const result = await this.fileService.getPublicUrls(ids);

    return { data: result };
  }

  @Post('/commit')
  async commitFiles(@Query() query: { ids: string[] }) {
    const { ids } = query;
    await this.fileService.commit(ids);
  }
}
