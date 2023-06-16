import { Injectable } from '@nestjs/common';
import { Goal } from 'modules/database/models/goal';
import { Transaction } from 'objection';

import { CreateByGroupValidator } from '../validators/goal/createByGroup';

@Injectable()
export class GoalRepository {
  public async findAllPublic(transaction?: Transaction): Promise<Goal[]> {
    return Goal.query(transaction)
      .join('users', 'users.id', 'goals.userId')
      .select(
        'goals.title',
        'goals.description',
        'users.firstName',
        'users.lastName',
        'goals.createdDate',
        'goals.status'
      )
      .where({ isPublic: true })
      .limit(10)
      .orderBy('createdDate');
  }

  public async findAllByGroup(id: number, transaction?: Transaction): Promise<Goal[]> {
    return Goal.query(transaction)
      .join('users', 'users.id', 'goals.userId')
      .select(
        'goals.title',
        'goals.description',
        'users.firstName',
        'users.lastName',
        'goals.createdDate',
        'goals.status'
      )
      .where({ 'goals.groupId': id });
  }

  public async getGoalDetails(id: number, transaction?: Transaction): Promise<Goal> {
    return Goal.query(transaction).findById(id);
  }

  public async create(model: CreateByGroupValidator, transaction?: Transaction): Promise<Goal> {
    return Goal.query(transaction).insertAndFetch(model);
  }

  public async update(model: Goal, transaction?: Transaction): Promise<Goal> {
    return Goal.query(transaction).updateAndFetchById(model.id, model);
  }
}
