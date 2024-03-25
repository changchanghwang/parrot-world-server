import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsString()
  @IsNotEmpty()
  categoryCode!: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  fileIds?: string[];
}
