import { Injectable } from '@nestjs/common';
import { Goal } from 'modules/database/models/goal';
import { Transaction } from 'objection';

@Injectable()
export class GoalRepository {
  public async findAllPublic(transaction?: Transaction): Promise<Goal[]> {
    return Goal.query(transaction).where({ isPublic: true });
  }

  public async findAllByGroup(id: number, transaction?: Transaction): Promise<Goal[]> {
    return Goal.query(transaction).where({ groupId: id });
  }

  public async getGoalDetails(id: number, transaction?: Transaction): Promise<Goal> {
    return Goal.query(transaction).findById(id);
  }

  public async create(model: Goal, transaction?: Transaction): Promise<Goal> {
    return Goal.query(transaction).insertAndFetch(model);
  }

  public async update(model: Goal, transaction?: Transaction): Promise<Goal> {
    return Goal.query(transaction).updateAndFetchById(model.id, model);
  }
}
