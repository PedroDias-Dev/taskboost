import { Injectable } from '@nestjs/common';
import { Group } from 'modules/database/models/group';
import { Transaction } from 'objection';

import { CreateGroupValidator } from '../validators/group/create';

@Injectable()
export class GroupRepository {
  public async getGoalDetails(id: number, transaction?: Transaction): Promise<Group> {
    return Group.query(transaction).findById(id);
  }

  public async create(model: CreateGroupValidator, transaction?: Transaction): Promise<Group> {
    return Group.query(transaction).insertAndFetch(model);
  }
}
