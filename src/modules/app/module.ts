import { HttpModule, Module } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { AuthController } from './controllers/auth';
import { FileController } from './controllers/file';
import { GoalsController } from './controllers/goals';
import { GroupsController } from './controllers/groups';
import { ProfileController } from './controllers/profile';
import { UserController } from './controllers/user';
import { DeviceRepository } from './repositories/device';
import { FileRepository } from './repositories/file';
import { GoalRepository } from './repositories/goal';
import { GroupRepository } from './repositories/group';
import { UserRepository } from './repositories/user';
import { AuthService } from './services/auth';
import { GroupInviteService } from './services/group-invite';
import { UserService } from './services/user';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule],
  controllers: [AuthController, UserController, ProfileController, GoalsController, FileController, GroupsController],
  providers: [
    AuthService,
    UserService,
    UserRepository,
    DeviceRepository,
    GoalRepository,
    FileRepository,
    GroupRepository,
    GroupInviteService
  ]
})
export class AppModule {}
