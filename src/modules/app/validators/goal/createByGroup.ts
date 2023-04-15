import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { enStatus, IGoal } from 'modules/database/interfaces/goal';

export class CreateByGroupValidator implements IGoal {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ required: true, type: 'string', minLength: 3, maxLength: 50 })
  public title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ required: true, type: 'string', minLength: 3, maxLength: 500 })
  public description: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ required: false, type: 'string', minLength: 3, maxLength: 500 })
  public fileUrl: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: true, type: 'integer' })
  public userId?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public groupId?: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ required: true, type: 'boolean' })
  public isPublic: boolean;

  @IsNotEmpty()
  @IsEnum(['pending'])
  @ApiProperty({ required: true, type: 'string', enum: ['pending'] })
  public status: enStatus[];
}
