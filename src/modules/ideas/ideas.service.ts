import { Injectable } from '@nestjs/common';
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

  async getIdea(id: string) {
    return await this.ideasRepository.findOne({ where: { id } });
  }

  async updateIdea(id: string, body: Partial<IdeasCreateResponseDto>) {
    await this.ideasRepository.update({ id }, body);
    return await this.ideasRepository.findOne({ id });
  }

  async deleteIdea(id: string) {
    await this.ideasRepository.delete({ id });
    return {
      deleted: true,
    };
  }
}