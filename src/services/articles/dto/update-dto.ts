import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateArticleDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  categoryCode?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  fileIds?: string[];
}
