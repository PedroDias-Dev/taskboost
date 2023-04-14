import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired, CurrentUser } from 'modules/common/guards/token';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { Goal } from 'modules/database/models/goal';

import { GoalRepository } from '../repositories/goal';

@ApiTags('App: Goals')
@Controller('/goals')
@AuthRequired()
export class GoalsController {
  constructor(private goalRepository: GoalRepository) {}

  @Get()
  @ApiResponse({ status: 200, type: Goal })
  public async findAllByGroup(@CurrentUser() currentUser: ICurrentUser) {
    return this.goalRepository.findAllByGroup(currentUser.groupId);
  }
}
