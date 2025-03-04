import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(readonly UserService: UserService) {}

  @Post('/signup')
  public createUser(@Req() req, @Body() userDto: UserDto) {
    console.log(userDto);
    return this.UserService.createUser(userDto);
  }

  @Post('/signin')
  public getUserByEmail(@Req() req) {
    console.log(req.body.email);
    const user = this.UserService.getUserByEmail(req.body.email);
    console.log(user);
    return user;
  }
}
