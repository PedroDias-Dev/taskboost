import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired, CurrentUser } from 'modules/common/guards/token';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { Group } from 'modules/database/models/group';

import { GroupRepository } from '../repositories/group';
import { CreateGroupValidator } from '../validators/group/create';

@ApiTags('App: Groups')
@Controller('/groups')
@AuthRequired()
export class GroupsController {
  constructor(private groupRepository: GroupRepository) {}

  @Get('/get-group')
  @ApiResponse({ status: 200, type: Group })
  public async getGoalDetails(@CurrentUser() currentUser: ICurrentUser) {
    return this.groupRepository.getGoalDetails(currentUser.groupId);
  }

  @Post('/create')
  @ApiResponse({ status: 200, type: Group })
  public async createByGroup(@Body() model: CreateGroupValidator) {
    return this.groupRepository.create(model);
  }
}
