import { Exclude } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class SoftUpdatePostDto {
  @IsOptional()
  @Exclude()
  _id: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  content: string;
}

export default SoftUpdatePostDto;
