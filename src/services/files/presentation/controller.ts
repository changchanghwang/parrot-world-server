import { Controller, Get, Post, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { isArray } from 'lodash';
import { FileService } from '../application/service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file', { dest: 'uploads' }))
  async uploadFiles(@UploadedFile() file: Express.Multer.File) {
    const data = await this.fileService.upload({ file });
    return { data };
  }

  @Get('/')
  async getFiles(@Query() query: { ids: string[] }) {
    const { ids } = query;
    const params = isArray(ids) ? ids : [ids];
    const result = await this.fileService.getPublicUrls(params);

    return { data: result };
  }

  @Post('/commit')
  async commitFiles(@Query() query: { ids: string[] }) {
    const { ids } = query;
    await this.fileService.commit(ids);
  }
}
