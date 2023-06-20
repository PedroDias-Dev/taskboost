import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'modules/database/models/user';

import { UserService } from '../services/user';
import { CreateValidator } from '../validators/user/create';

@ApiTags('App: User')
@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiResponse({ status: 200, type: User })
  public async create(@Body() model: CreateValidator) {
    return this.userService.create(model);
  }
}
