import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { SearchKey } from '../domain/model';

class SearchDto {
  @IsString()
  @IsNotEmpty()
  key!: SearchKey;

  @IsString()
  @IsNotEmpty()
  value!: string;
}

export class listArticleQueryDto {
  @IsString()
  @IsNotEmpty()
  categoryCode!: string;

  @IsNumber()
  @IsNotEmpty()
  page!: number;

  @IsNumber()
  @IsNotEmpty()
  limit!: number;

  @IsOptional()
  search?: SearchDto;
}
