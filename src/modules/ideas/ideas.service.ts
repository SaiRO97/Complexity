import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaEntity } from './ideas.entity';
import { IdeasCreateResponseDto, IdeasResponseDto } from './ideas.interfaces';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class IdeasService {
  constructor(
    @InjectRepository(IdeaEntity)
    private ideasRepository: Repository<IdeaEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  toResponseAuthorObject (idea) {
    return {
      ...idea,
      author: idea.author ? idea.author.toResponseObject() : null
    }
  }

  private ensureOwnerShip(idea: IdeaEntity, userId: string){
    if (idea.author.id !== userId){
      throw new HttpException('Incorrect user', HttpStatus.UNAUTHORIZED)
    }
  }

  async getAll() {
    const ideas = await this.ideasRepository.find({ relations: ['author'] });
    return ideas.map(idea => this.toResponseAuthorObject(idea))
  }

  async createIdea(userId: string, body: IdeasCreateResponseDto) {
    const user = await this.userRepository.findOne({ where: { id: userId }})
    const idea = await this.ideasRepository.create({...body, author: user });
    this.ensureOwnerShip(idea ,userId);
    await this.ideasRepository.save(idea);
    return this.toResponseAuthorObject(idea);
  }

  async getIdea(id: number) {
    const idea = await this.ideasRepository.findOne({ where: { id }, relations: ['author'] });
    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    return idea
  }

  async updateIdea(id: number, userId: string, body: Partial<IdeasCreateResponseDto>) {
    let idea = await this.ideasRepository.findOne({ where: { id }, relations: ['author'] })
    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    this.ensureOwnerShip(idea, userId)
    await this.ideasRepository.update({ id }, body);
    idea = await this.ideasRepository.findOne({ where: { id }, relations: ['author']})
    return idea
  }

  async deleteIdea(userId:string, id: number) {
    const idea = await this.ideasRepository.findOne({ where: { id }, relations: ['author'] })
    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    this.ensureOwnerShip(idea, userId)
    await this.ideasRepository.delete({ id });
    return idea;
  }
}
