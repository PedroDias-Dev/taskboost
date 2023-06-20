import { enRoles } from 'modules/database/interfaces/user';

export interface ICurrentUser {
  id: number;
  email: string;
  firstName: string;
  lastName?: string;
  roles: enRoles[];
  groupId: number;
}
