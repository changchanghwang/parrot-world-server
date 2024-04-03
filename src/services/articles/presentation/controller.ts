import { Body, Controller, HttpCode, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import type { User } from '@users/domain/model';
import { AuthGuard } from '@libs/auth';
import { ArticleService } from '../application/service';
import { CreateArticleDto } from '../dto/create-dto';
import { UpdateArticleDto } from '../dto';

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

  @Patch('/:id')
  @UseGuards(AuthGuard)
  async update(@Req() req: Request, @Param() param: { id: string }, @Body() body: UpdateArticleDto) {
    const { user } = req.state;
    const { id } = param;

    const data = await this.articleService.update({ user: user as User }, id, body);
    return { data };
  }
}
