import { Body, Controller, Delete, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@libs/auth';
import type { User } from '@users/domain/model';
import { CommentService } from '../application/service';
import { CreateCommentDto } from '../dto';
import { UpdateArticleDto } from '../../articles/dto';

@Controller('/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Req() req: Request, @Body() body: CreateCommentDto) {
    const { user } = req.state as { user: User };

    return this.commentService.create({ user }, body);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  async update(@Req() req: Request, @Param() param: { id: string }, @Body() body: UpdateArticleDto) {
    const { user } = req.state as { user: User };
    const { id } = param;

    const data = await this.commentService.update({ user }, id, body);
    return { data };
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async delete(@Req() req: Request, @Param() param: { id: string }) {
    const { user } = req.state as { user: User };
    const { id } = param;

    await this.commentService.delete({ user }, id);
  }
}
