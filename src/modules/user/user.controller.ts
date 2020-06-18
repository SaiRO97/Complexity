import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginResponseDto } from './user.interfaces';
import { ValidationPipe } from '../../shared/validation/validation.pipe';
import { AuthGuard } from '../../shared/auth.guard';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('api/users')
  @UseGuards(new AuthGuard())
  getAllUsers(){
    return this.userService.getAll();
  }

  @Get('api/users/:id')
  getUser(@Param('id', ParseUUIDPipe) id: number){
    return this.userService.getSingleUser(id)
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  singIn(@Body() body: UserLoginResponseDto){
    return this.userService.login(body)
  }

  @Post('/register')
  @UsePipes(new ValidationPipe())
  singUp(@Body() body: UserLoginResponseDto){
    return this.userService.register(body)
  }

}
