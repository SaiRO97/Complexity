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
    const users = await this.userRepository.find({ relations: ['ideas'] })
    if(!users){
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    return users.map(user => user.toResponseObject())
  }

  async getSingleUser(id: number){
    const user = await this.userRepository.findOne({where: {id}, relations: ['ideas']});
    if(!user){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return user.toResponseObject()
  }

  async login(body: UserLoginResponseDto){
    const {username, password} = body
    const user = await this.userRepository.findOne({where: {username}})
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException('invalid username/password', HttpStatus.BAD_GATEWAY)
    }
    return user.toResponseObject(true)
  }

  async register(body: UserLoginResponseDto){
    const {username} = body
    let user = await this.userRepository.findOne({where: {username}})
    if(user){
      throw new HttpException('user already exist', HttpStatus.UNAUTHORIZED)
    }
    user = await this.userRepository.create(body);
    await this.userRepository.save(user)
    return user.toResponseObject(true)
  }

}
