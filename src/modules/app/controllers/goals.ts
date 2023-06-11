import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired, CurrentUser } from 'modules/common/guards/token';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { Goal } from 'modules/database/models/goal';

import { GoalRepository } from '../repositories/goal';
import { CreateByGroupValidator } from '../validators/goal/createByGroup';

@ApiTags('App: Goals')
@Controller('/goals')
@AuthRequired()
export class GoalsController {
  constructor(private goalRepository: GoalRepository) {}

  @Get('/get-by-group')
  @ApiResponse({ status: 200, type: Goal })
  public async findAllByGroup(@CurrentUser() currentUser: ICurrentUser) {
    return this.goalRepository.findAllByGroup(currentUser.groupId);
  }

  @Get('/get-public')
  @ApiResponse({ status: 200, type: Goal })
  public async findAllPublic() {
    return this.goalRepository.findAllPublic();
  }

  @Post('/create-by-group')
  @ApiResponse({ status: 200, type: Goal })
  public async createByGroup(@Body() model: CreateByGroupValidator, @CurrentUser() currentUser: ICurrentUser) {
    console.log(currentUser);
    return this.goalRepository.create({
      ...model,
      groupId: currentUser.groupId,
      userId: currentUser.id,
      isPublic: false
    });
  }

  @Post('/create-public')
  @ApiResponse({ status: 200, type: Goal })
  public async createPublic(@Body() model: CreateByGroupValidator, @CurrentUser() currentUser: ICurrentUser) {
    console.log(currentUser);
    return this.goalRepository.create({
      ...model,
      userId: currentUser.id,
      isPublic: true
    });
  }
}
