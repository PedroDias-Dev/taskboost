import { Injectable } from '@nestjs/common';
import { Goal } from 'modules/database/models/goal';
import { Transaction } from 'objection';

import { CreateByGroupValidator } from '../validators/goal/createByGroup';
import { GroupRepository } from './group';

@Injectable()
export class GoalRepository {
  constructor(private groupRepository: GroupRepository) {}

  public async findAllPublic(transaction?: Transaction): Promise<Goal[]> {
    return Goal.query(transaction)
      .join('users', 'users.id', 'goals.userId')
      .select('goals.*', 'users.firstName', 'users.lastName')
      .where({ isPublic: true })
      .limit(10)
      .orderBy('createdDate');
  }

  public async findAllByGroup(id: number, transaction?: Transaction): Promise<Goal[]> {
    const group = await this.groupRepository.getGroupDetails(id, transaction);
    const groupId = group.id;

    return Goal.query(transaction)
      .join('users', 'users.id', 'goals.userId')
      .select('goals.*', 'users.firstName', 'users.lastName')
      .where({ 'goals.groupId': groupId });
  }

  public async getGoalDetails(id: number, transaction?: Transaction): Promise<Goal> {
    return Goal.query(transaction).findById(id);
  }

  public async create(model: CreateByGroupValidator, transaction?: Transaction): Promise<Goal> {
    return Goal.query(transaction).insertAndFetch(model);
  }

  public async update(model: CreateByGroupValidator, transaction?: Transaction): Promise<Goal> {
    return Goal.query(transaction).updateAndFetchById(model.id, model);
  }

  public async delete(id: number, transaction?: Transaction): Promise<void> {
    await Goal.query(transaction).deleteById(id);
  }
}
