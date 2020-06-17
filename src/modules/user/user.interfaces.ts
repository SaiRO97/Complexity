import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginResponseDto {

  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string

}

export class UserRegisterResponseDto {

}