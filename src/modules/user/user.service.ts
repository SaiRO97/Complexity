import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserLoginResponseDto, UserRegisterResponseDto } from './user.interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAll() {
    const users = await this.userRepository.find()
    if(!users){
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    return users.map(user => user.toResponseObject())
  }

  async getSingleUser(id: number){
    const user = await this.userRepository.findOne({where: {id}});
    if(!user){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return user.toResponseObject()
  }

  async login(body: UserLoginResponseDto){

  }

  async register(body: UserRegisterResponseDto){

  }

}
