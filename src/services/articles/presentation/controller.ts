import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import type { User } from '@users/domain/model';
import { AuthGuard } from '@libs/auth';
import { ArticleService } from '../application/service';
import { CreateArticleDto } from '../dto/create-dto';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async create(@Req() req: Request, @Body() body: CreateArticleDto) {
    const { user } = req.state;

    await this.articleService.create({ user: user as User }, body);
  }
}
