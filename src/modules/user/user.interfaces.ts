import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { IdeaEntity } from '../ideas/ideas.entity';

export class UserLoginResponseDto {

  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string

}

export class UserResponseDto {

  @IsString()
  id: string

  @IsString()
  username: string

  @IsDate()
  createdAt: Date

  ideas?: IdeaEntity[]

}