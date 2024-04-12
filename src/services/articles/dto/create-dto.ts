import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CategoryCode } from '../domain/model';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsEnum(CategoryCode)
  @IsNotEmpty()
  categoryCode!: CategoryCode;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  fileIds?: string[];
}
