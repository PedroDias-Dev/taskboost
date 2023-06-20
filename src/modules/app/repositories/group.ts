import { Injectable, NotFoundException } from '@nestjs/common';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { IGroup } from 'modules/database/interfaces/group';
import { Group } from 'modules/database/models/group';
import { Transaction } from 'objection';

import { GroupInviteService } from '../services/group-invite';
import { UserRepository } from './user';

@Injectable()
export class GroupRepository {
  constructor(private groupService: GroupInviteService, private userRepository: UserRepository) {}

  public async getAllGroups(transaction?: Transaction): Promise<Group[]> {
    return Group.query(transaction).orderBy('name');
  }

  public async getGroupDetails(id: number, transaction?: Transaction): Promise<Group> {
    const user = await this.userRepository.findById(id);

    if (!user?.groupId) throw new NotFoundException('Usuário não possui grupo');

    const group = await Group.query(transaction).findById(user.groupId);

    if (!group) throw new NotFoundException('Grupo não encontrado');

    return group;
  }

  public async create(model: IGroup, currentUser: ICurrentUser, transaction?: Transaction): Promise<Group> {
    const group = await Group.query(transaction).insertAndFetch(model);

    const user = currentUser as any;

    delete user.type;
    delete user.exp;
    delete user.iat;

    if (group) {
      this.userRepository.update(
        {
          ...user,
          groupId: group.id
        },
        transaction
      );
    }

    return group;
  }

  public async getGroupInvite(id: number, transaction?: Transaction): Promise<{ invite: string }> {
    const group = await this.getGroupDetails(id, transaction);

    return this.groupService.generateInvite(group);
  }

  public async confirmInvite(userId: number, invite: string, transaction?: Transaction): Promise<Boolean> {
    const groups = await this.getAllGroups(transaction);

    let groupInvite = null;

    for (const group of groups) {
      const isInviteValid = await this.groupService.compare(invite, group.name);
      if (isInviteValid) groupInvite = group;
    }

    if (!groupInvite) throw new NotFoundException('Convite inválido');

    const user = await this.userRepository.findById(userId, transaction);
    await this.userRepository.update(
      {
        ...user,
        groupId: groupInvite.id
      },
      transaction
    );

    return true;
  }
}
