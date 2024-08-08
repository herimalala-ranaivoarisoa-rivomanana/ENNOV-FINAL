import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ required: true })
  name: string;

  @IsNumber()
  @ApiProperty({ required: true })
  price: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({ required: true })
  description: string;
}
