import { IsDate, IsNumber, IsString } from 'class-validator';


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

}
