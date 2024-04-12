import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { CategoryCode } from '../domain/model';

export class UpdateArticleDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsEnum(CategoryCode)
  @IsOptional()
  categoryCode?: CategoryCode;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  fileIds?: string[];
}
