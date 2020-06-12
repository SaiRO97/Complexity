import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { IdeasCreateResponseDto, IdeasReponseDto } from './ideas.interfaces';

@Controller('ideas')
export class IdeasController {
  constructor(private ideasService: IdeasService) {}

  @Get()
  getAll(): Promise<IdeasReponseDto[]> {
    return this.ideasService.getAll();
  }

  @Post()
  createIdea(@Body() body: IdeasCreateResponseDto) {
    return this.ideasService.createIdea(body);
  }

  @Get('/:id')
  getIdea(@Param('id', ParseIntPipe) id: number): Promise<IdeasReponseDto> {
    return this.ideasService.getIdea(id);
  }

  @Put('/:id')
  updateIdea(
    @Param() id: number,
    @Body() body: Partial<IdeasCreateResponseDto>,
  ): Promise<IdeasReponseDto> {
    return this.ideasService.updateIdea(id, body);
  }

  @Delete('/:id')
  deleteIdea(
    @Param() id: number,
  ): Promise<{
    deleted: boolean;
  }> {
    return this.ideasService.deleteIdea(id);
  }
}
