import { Controller } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';

import { PublicUser } from './user.model';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getAll(): Promise<PublicUser[]> {
    return this.userService.getUsers();
  }

  @Post()
  addUser(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('name') name: string,
  ) {
    return this.userService.addUser(username, password, name);
  }
}
