import { IsDate, IsNumber, IsString } from 'class-validator';
import { UserEntity } from '../user/user.entity';


export class IdeasCreateResponseDto {

  @IsString()
  title: string;

  @IsString()
  description: string;

}

export class IdeasResponseDto {

  @IsNumber()
  id: number;

  @IsDate()
  createdAt: Date;

  @IsString()
  title: string;

  @IsString()
  description: string;

  author?: UserEntity

}
