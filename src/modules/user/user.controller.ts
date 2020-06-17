import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginResponseDto } from './user.interfaces';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/users')
  getAllUsers(){
    return this.userService.getAll();
  }

  @Get('/users/:id')
  getUser(@Param('id', ParseUUIDPipe) id: number){
    return this.userService.getSingleUser(id)
  }

  @Post('/login')
  singIn(@Body() body: UserLoginResponseDto){
    return this.userService.login(data)
  }

  @Post('/register')
  singUp(@Body() body){
    return this.userService.register(data)
  }

}
