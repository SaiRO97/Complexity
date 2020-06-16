import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaEntity } from './ideas.entity';
import { IdeasCreateResponseDto } from './ideas.interfaces';

@Injectable()
export class IdeasService {
  constructor(
    @InjectRepository(IdeaEntity)
    private ideasRepository: Repository<IdeaEntity>,
  ) {}

  async getAll() {
    return await this.ideasRepository.find();
  }

  async createIdea(body: IdeasCreateResponseDto) {
    const idea = await this.ideasRepository.create(body);
    await this.ideasRepository.save(idea);
    return idea;
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
