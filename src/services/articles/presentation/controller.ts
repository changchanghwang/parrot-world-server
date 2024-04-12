import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import type { User } from '@users/domain/model';
import { AuthGuard } from '@libs/auth';
import { keyBy } from 'lodash';
import { ArticleService } from '../application/service';
import { CreateArticleDto } from '../dto/create-dto';
import { UpdateArticleDto, listArticleQueryDto } from '../dto';
import { UserService } from '../../users/application/service';

@Controller('articles')
export class ArticleController {
  constructor(
    private articleService: ArticleService,
    private userService: UserService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async create(@Req() req: Request, @Body() body: CreateArticleDto) {
    const { user } = req.state as { user: User };

    await this.articleService.create({ user: user as User }, body);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  async update(@Req() req: Request, @Param() param: { id: string }, @Body() body: UpdateArticleDto) {
    const { user } = req.state as { user: User };
    const { id } = param;

    const data = await this.articleService.update({ user: user as User }, id, body);
    return { data };
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async delete(@Req() req: Request, @Param() param: { id: string }) {
    const { user } = req.state as { user: User };
    const { id } = param;

    await this.articleService.delete({ user: user as User }, id);
  }

  @Get()
  async list(@Query() query: listArticleQueryDto) {
    const { page, limit, categoryCode, search } = query;
    const result = await this.articleService.getList({ categoryCode, page, limit, search });
    const users = await this.userService.getList({ ids: result.items.map((article) => article.userId) });
    const userOf = keyBy(users, 'id');

    return {
      data: {
        ...result,
        items: result.items.map((article) => {
          const author = userOf[article.userId];
          return {
            ...article,
            author: {
              nickName: author?.nickName ?? '앵이브닝',
              email: author?.email ?? 'evening@angMorning.com',
            },
          };
        }),
      },
    };
  }
}
