import { Injectable } from '@nestjs/common';
import { UserRepository } from 'modules/admin/repositories/user';
import { Group } from 'modules/database/models/group';
import { Transaction } from 'objection';

import { GroupInviteService } from '../services/group-invite';
import { CreateGroupValidator } from '../validators/group/create';

@Injectable()
export class GroupRepository {
  constructor(private groupService: GroupInviteService, private userRepository: UserRepository) {}

  public async getGroupDetails(id: number, transaction?: Transaction): Promise<Group> {
    return Group.query(transaction).findById(id);
  }

  public async create(model: CreateGroupValidator, transaction?: Transaction): Promise<Group> {
    return Group.query(transaction).insertAndFetch(model);
  }

  public async getGroupInvite(id: number, transaction?: Transaction): Promise<{ invite: string }> {
    const group = await this.getGroupDetails(id, transaction);

    return this.groupService.generateInvite(group);
  }

  public async confirmInvite(
    groupId: number,
    userId: number,
    invite: string,
    transaction?: Transaction
  ): Promise<Boolean> {
    const group = await this.getGroupDetails(groupId, transaction);
    const isInviteValid = await this.groupService.compare(invite, group.name);

    if (!isInviteValid) return false;

    const user = await this.userRepository.findById(userId, transaction);
    await this.userRepository.update(
      {
        ...user,
        groupId
      },
      transaction
    );

    return true;
  }
}
