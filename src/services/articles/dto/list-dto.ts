import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CategoryCode, SearchKey } from '../domain/model';

class SearchDto {
  @IsString()
  @IsNotEmpty()
  key!: SearchKey;

  @IsString()
  @IsNotEmpty()
  value!: string;
}

export class listArticleQueryDto {
  @IsEnum(CategoryCode)
  @IsNotEmpty()
  categoryCode!: CategoryCode;

  @IsNumber()
  @IsNotEmpty()
  page!: number;

  @IsNumber()
  @IsNotEmpty()
  limit!: number;

  @IsOptional()
  search?: SearchDto;
}
