import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IGoal } from '../interfaces/goal';
import { Group } from './group';
import { User } from './user';

export class Goal extends Model implements IGoal {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'string' })
  public title: string;
  @ApiProperty({ type: 'string' })
  public description: string;
  @ApiProperty({ type: 'string' })
  public fileUrl: string;
  @ApiProperty({ type: 'integer' })
  public userId?: number;
  @ApiProperty({ type: 'integer', required: false })
  public groupId?: number;
  @ApiProperty({ type: 'boolean' })
  public isPublic?: boolean;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  public user: User;
  public group: Group;

  public static get tableName(): string {
    return 'goals';
  }

  public static get virtualAttributes(): string[] {
    return ['name'];
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }
}
