import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InviteValidator {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, type: 'string', minLength: 3, maxLength: 50 })
  public invite: string;
}
