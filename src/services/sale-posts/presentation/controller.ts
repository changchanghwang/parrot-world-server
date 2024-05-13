import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import type { User } from '@users/domain/model';
import { AuthGuard } from '@libs/auth';
import { SalePostService } from '../application/service';
import { FileService } from '../../files/application/service';
import { CreateSalePostDto } from '../dto';

@Controller('sale-posts')
export class SalePostController {
  constructor(
    private salePostService: SalePostService,
    private fileService: FileService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async create(@Req() req: Request, @Body() body: CreateSalePostDto) {
    const { user } = req.state as { user: User };

    const salePost = await this.salePostService.create({ user }, body);
    await this.fileService.commit([...salePost.fileIds, salePost.thumbnailId]);
  }
}
