import { Body, Controller, Delete, Get, NotFoundException, Post, Put } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired, CurrentUser } from 'modules/common/guards/token';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { Goal } from 'modules/database/models/goal';

import { GoalRepository } from '../repositories/goal';
import { GroupRepository } from '../repositories/group';
import { CreateByGroupValidator } from '../validators/goal/createByGroup';

@ApiTags('App: Goals')
@Controller('/goals')
@AuthRequired()
export class GoalsController {
  constructor(private goalRepository: GoalRepository, private groupRepository: GroupRepository) {}

  @Get('/get-by-group')
  @ApiResponse({ status: 200, type: Goal })
  public async findAllByGroup(@CurrentUser() currentUser: ICurrentUser) {
    return this.goalRepository.findAllByGroup(currentUser.id);
  }

  @Get('/get-public')
  @ApiResponse({ status: 200, type: Goal })
  public async findAllPublic() {
    return this.goalRepository.findAllPublic();
  }

  @Post('/create-by-group')
  @ApiResponse({ status: 200, type: Goal })
  public async createByGroup(@Body() model: CreateByGroupValidator, @CurrentUser() currentUser: ICurrentUser) {
    const group = await this.groupRepository.getGroupDetails(currentUser.id);

    if (!group) throw new NotFoundException('Usuário não está em um grupo');

    return this.goalRepository.create({
      ...model,
      groupId: group.id,
      userId: currentUser.id,
      isPublic: false
    });
  }

  @Post('/create-public')
  @ApiResponse({ status: 200, type: Goal })
  public async createPublic(@Body() model: CreateByGroupValidator, @CurrentUser() currentUser: ICurrentUser) {
    return this.goalRepository.create({
      ...model,
      userId: currentUser.id,
      isPublic: true
    });
  }

  @Put('/update')
  @ApiResponse({ status: 200, type: Goal })
  public async update(@Body() model: CreateByGroupValidator) {
    return this.goalRepository.update(model);
  }

  @Delete('/delete/:id')
  @ApiResponse({ status: 200, type: Goal })
  public async delete(@Param() params: any) {
    return this.goalRepository.delete(params.id);
  }
}
