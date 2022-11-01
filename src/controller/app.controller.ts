import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { LoginBody, SignupBody } from './app.type';

@Controller()
export class AppController {
  constructor(
    private readonly _appService: AppService,
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this._appService.getHello();
  }

  @Post('/signup')
  signup(@Body() body: SignupBody) {
    console.log(body);
    return this._authService.signup(body);
  }

  @Post('/login')
  login(@Body() body: LoginBody) {
    return this._authService.login(body);
  }

  @Get('/users')
  users() {
    return this._userService.getUsers();
  }

  @Get('/me')
  me() {
    // TODO

    return {
      email: '',
    };
  }
}
