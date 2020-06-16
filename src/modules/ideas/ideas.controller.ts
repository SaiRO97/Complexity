import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { IdeasCreateResponseDto, IdeasResponseDto } from './ideas.interfaces';

@Controller('ideas')
export class IdeasController {
  constructor(private ideasService: IdeasService) {}

  @Get()
  getAll(): Promise<IdeasResponseDto[]> {
    return this.ideasService.getAll();
  }

  @Post()
  createIdea(@Body() body: IdeasCreateResponseDto) {
    return this.ideasService.createIdea(body);
  }

  @Get('/:id')
  getIdea(@Param('id', ParseUUIDPipe) id: number): Promise<IdeasResponseDto> {
    return this.ideasService.getIdea(id);
  }

  @Put('/:id')
  updateIdea(
    @Param('id', ParseUUIDPipe) id: number,
    @Body() body: Partial<IdeasCreateResponseDto>,
  ): Promise<IdeasResponseDto> {
    return this.ideasService.updateIdea(id, body);
  }

  @Delete('/:id')
  deleteIdea(
    @Param('id', ParseUUIDPipe) id: number,
  ): Promise<IdeasResponseDto> {
    return this.ideasService.deleteIdea(id);
  }
}
