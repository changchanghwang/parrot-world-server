import { Body, Controller, HttpCode, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import type { User } from '@users/domain/model';
import { AuthGuard } from '@libs/auth';
import { FileService } from '@files/application/service';
import { SalePostService } from '../application/service';
import { CreateSalePostDto, UpdateSalePostDto } from '../dto';

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

  @Patch('/:id')
  @UseGuards(AuthGuard)
  async update(@Req() req: Request, @Param() param: { id: string }, @Body() body: UpdateSalePostDto) {
    const { user } = req.state as { user: User };
    const { id } = param;

    const data = await this.salePostService.update({ user }, id, body);
    return { data };
  }
}
