import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post()
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<string> {
    console.log(username, password);
    return await this.loginService.login(username, password);
  }
}
