import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ required: false })
  name?: string;

  @IsNumber()
  @ApiProperty({ required: false })
  price?: number;

  @ApiProperty({ required: false })
  description?: string;
}
