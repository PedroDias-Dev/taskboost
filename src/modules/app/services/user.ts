import { ConflictException, Injectable } from '@nestjs/common';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { PasswordService } from 'modules/common/services/password';
import { IUser } from 'modules/database/interfaces/user';
import { User } from 'modules/database/models/user';

import { UserRepository } from '../repositories/user';
import { CreateValidator } from '../validators/user/create';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository, private passwordService: PasswordService) {}

  public async create(model: CreateValidator): Promise<User> {
    delete model.id;

    const isEmailAvailable = await this.userRepository.isEmailAvailable(model.email);
    if (!isEmailAvailable) throw new ConflictException('O e-mail especificado já está em uso');

    model.password = await this.passwordService.hash(model.password);

    return this.userRepository.create(model);
  }

  public async update(model: IUser, currentUser: ICurrentUser): Promise<User> {
    delete model.id;

    const user = await this.userRepository.findById(currentUser.id);

    if (user.email !== model.email) {
      const isEmailAvailable = await this.userRepository.isEmailAvailable(model.email);
      if (!isEmailAvailable) throw new ConflictException('email-unavailable');
    }

    return this.userRepository.update({ ...user, ...model });
  }
}
