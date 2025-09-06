import {
  IsString,
  IsOptional,
  IsBoolean,
  MaxLength,
  IsUrl,
} from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  slug?: string;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsString()
  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  featuredImage?: string;
}
