import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { PasswordService } from 'modules/common/services/password';
import { TokenService } from 'modules/common/services/token';

import { DeviceRepository } from '../repositories/device';
import { UserRepository } from '../repositories/user';
import { LoginValidator } from '../validators/auth/login';

@Injectable()
export class AuthService {
  constructor(
    private tokenService: TokenService,
    private userRepository: UserRepository,
    private deviceRepository: DeviceRepository,
    private passwordService: PasswordService
  ) {}

  public async login(model: LoginValidator): Promise<{ accessToken: String }> {
    const user = await this.userRepository.findByEmail(model.email);
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const isValid = await this.passwordService.compare(user.password, model.password);
    if (!isValid) throw new BadRequestException('Senha incorreta, tente novamente.');

    const accessToken = await this.tokenService.generateAccessToken(user, true);

    return { accessToken };
  }

  public async logout(currentUser: ICurrentUser, deviceId: string) {
    const device = await this.deviceRepository.findById(deviceId);

    if (!device) throw new NotFoundException('device-not-found');
    if (device.userId !== currentUser.id) throw new BadRequestException('invalid-user');

    await this.deviceRepository.remove(deviceId);
  }
}
