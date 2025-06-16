import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { SaleType, saleType } from '../domain/model';

export class CreateSalePostDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsEnum(saleType)
  @IsNotEmpty()
  type!: SaleType;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  fileIds?: string[];

  @IsNotEmpty()
  @IsNumber()
  price!: number;

  @IsString()
  @IsNotEmpty()
  thumbnailId!: string;
}
