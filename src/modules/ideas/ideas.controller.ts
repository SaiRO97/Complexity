import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { IdeasService } from './ideas.service';

@Controller('ideas')
export class IdeasController {
  constructor(private ideasService: IdeasService) {}

  @Get()
  async getAll() {}

  @Post()
  async createIdea() {}

  @Get(':id')
  async getIdea() {}

  @Put(':id')
  async updateIdea() {}

  @Delete(':id')
  async deleteIdea() {}
}
