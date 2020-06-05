import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { IdeasCreateResponseDto } from './ideas.interfaces';

@Controller('ideas')
export class IdeasController {
  constructor(private ideasService: IdeasService) {}

  @Get()
  getAll() {
    return this.ideasService.getAll();
  }

  @Post()
  createIdea(@Body() body: IdeasCreateResponseDto) {
    return this.ideasService.createIdea(body);
  }

  @Get(':id')
  getIdea(@Param() id: string) {
    console.log(id);
    return this.ideasService.getIdea(id);
  }

  @Put(':id')
  updateIdea(
    @Param() id: string,
    @Body() body: Partial<IdeasCreateResponseDto>,
  ) {
    return this.ideasService.updateIdea(id, body);
  }

  @Delete(':id')
  deleteIdea(@Param() id: string) {
    return this.ideasService.deleteIdea(id);
  }
}
