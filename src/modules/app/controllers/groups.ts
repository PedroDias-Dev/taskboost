import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired, CurrentUser } from 'modules/common/guards/token';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { Group } from 'modules/database/models/group';

import { GroupRepository } from '../repositories/group';
import { CreateGroupValidator } from '../validators/group/create';
import { InviteValidator } from '../validators/group/invite';

@ApiTags('App: Groups')
@Controller('/groups')
@AuthRequired()
export class GroupsController {
  constructor(private groupRepository: GroupRepository) {}

  @Get('/get-group')
  @ApiResponse({ status: 200, type: Group })
  public async getGroupDetails(@CurrentUser() currentUser: ICurrentUser) {
    return this.groupRepository.getGroupDetails(currentUser.groupId);
  }

  @Post('/create')
  @ApiResponse({ status: 200, type: Group })
  public async createGroup(@Body() model: CreateGroupValidator) {
    return this.groupRepository.create(model);
  }

  @Get('/get-group-invite')
  @ApiResponse({ status: 200, type: String })
  public async getGroupInvite(@CurrentUser() currentUser: ICurrentUser) {
    return this.groupRepository.getGroupInvite(currentUser.groupId);
  }

  @Post('/confirm-group-invite')
  @ApiResponse({ status: 200, type: String })
  public async confirmGroupInvite(@Body() model: InviteValidator, @CurrentUser() currentUser: ICurrentUser) {
    return this.groupRepository.confirmInvite(currentUser.groupId, currentUser.id, model.invite);
  }
}
