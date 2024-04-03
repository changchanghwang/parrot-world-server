import { Injectable } from '@nestjs/common';
import { ApplicationService } from '@libs/ddd';
import { User } from '@users/domain/model';
import { ArticleRepository } from '../infrastructure/repository';
import { Article } from '../domain/model';
import { UpdatableArticleSpec } from '../domain/specs';

@Injectable()
export class ArticleService extends ApplicationService {
  constructor(private articleRepository: ArticleRepository) {
    super();
  }

  async create(
    { user }: { user: User },
    {
      title,
      content,
      categoryCode,
      fileIds,
    }: { title: string; content: string; categoryCode: string; fileIds?: string[] },
  ) {
    const article = Article.from({ title, content, authorId: user.id, categoryCode, fileIds });
    await this.articleRepository.save([article]);
    return article;
  }

  async update(
    { user }: { user: User },
    articleId: string,
    {
      title,
      content,
      categoryCode,
      fileIds,
    }: { title?: string; content?: string; categoryCode?: string; fileIds?: string[] },
  ) {
    const [article] = await this.articleRepository.findSpec(new UpdatableArticleSpec({ user, id: articleId }));
    article.update({ title, content, categoryCode, fileIds });
    await this.articleRepository.save([article]);
    return article;
  }
}
