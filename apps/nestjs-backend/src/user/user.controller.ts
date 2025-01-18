import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('signup')
    async signup(
      @Body('username') username: string,
      @Body('password') password: string,
      @Body('email') email: string,
    ) {
      const user = await this.userService.createUser(username, password, email);
      return { message: 'User created successfully', user };
    }
}
