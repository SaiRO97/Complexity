import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaEntity } from './ideas.entity';
import { IdeasCreateResponseDto } from './ideas.interfaces';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class IdeasService {
  constructor(
    @InjectRepository(IdeaEntity)
    private ideasRepository: Repository<IdeaEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async getAll() {
    const ideas = await this.ideasRepository.find({ relations: ['author'] });
    return ideas.map(idea => (
      {
        ...idea,
        author: idea.author.toResponseObject()
      }
    ))
  }

  async createIdea(userId: string, body: IdeasCreateResponseDto) {
    const user = await this.userRepository.findOne({ where: { id: userId }})
    const idea = await this.ideasRepository.create({...body, author: user });
    await this.ideasRepository.save(idea);
    return {
      ...idea,
      author: idea.author.toResponseObject()
    };
  }

  async getIdea(id: number) {
    const idea = await this.ideasRepository.findOne({ where: { id } });

    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }

    return idea
  }

  async updateIdea(id: number, body: Partial<IdeasCreateResponseDto>) {
    let idea = await this.ideasRepository.findOne({ where: { id } })
    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    await this.ideasRepository.update({ id }, body);
    idea = await this.ideasRepository.findOne({ where: { id } })
    return idea
  }

  async deleteIdea(id: number) {
    const idea = await this.ideasRepository.findOne({where: {id} })
    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }

    await this.ideasRepository.delete({ id });
    return idea;
  }
}
