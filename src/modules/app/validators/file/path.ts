import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PathValidator {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, type: 'string' })
  public filename?: string;
}
