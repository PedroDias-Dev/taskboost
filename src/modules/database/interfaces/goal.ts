import { IGroup } from './group';
import { IUser } from './user';

export interface IGoal {
  id?: number;
  title: string;
  description?: string;
  fileUrl?: string;
  userId?: number;
  groupId?: number;
  status?: enStatus[];
  isPublic?: boolean;

  createdDate?: Date;
  updatedDate?: Date;

  user?: IUser;
  group?: IGroup;
}

export enum enStatus {
  pending = 'pending',
  active = 'active',
  completed = 'completed',
  deleted = 'deleted'
}
