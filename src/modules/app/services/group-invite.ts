import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { Group } from 'modules/database/models/group';
import { BCRYPT_SALT_FACTOR } from 'settings';

@Injectable()
export class GroupInviteService {
  public async hash(groupName: string): Promise<string> {
    const salt = await bcrypt.genSalt(BCRYPT_SALT_FACTOR);
    return bcrypt.hash(groupName, salt);
  }

  public async compare(hash: string, password: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  public async generateInvite(group: Group): Promise<{ invite: string }> {
    const invite = await this.hash(group.name);

    return { invite };
  }
}
