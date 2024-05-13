import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { SaleType } from '../domain/model';

export class UpdateSalePostDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  fileIds?: string[];

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  thumbnailId?: string;

  @IsOptional()
  type?: SaleType;
}
