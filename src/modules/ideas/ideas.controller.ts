import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe, UsePipes, Logger,
} from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { IdeasCreateResponseDto, IdeasResponseDto } from './ideas.interfaces';
import { ValidationPipe } from '../../shared/validation/validation.pipe';

@Controller('ideas')
export class IdeasController {
  private logger = new Logger();
  constructor(private ideasService: IdeasService) {}

  @Get()
  getAll(): Promise<IdeasResponseDto[]> {
    return this.ideasService.getAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createIdea(@Body() body: IdeasCreateResponseDto) {
    this.logger.log(JSON.stringify(body))
    return this.ideasService.createIdea(body);
  }

  @Get('/:id')
  getIdea(@Param('id', ParseUUIDPipe) id: number): Promise<IdeasResponseDto> {
    return this.ideasService.getIdea(id);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  updateIdea(
    @Param('id', ParseUUIDPipe) id: number,
    @Body() body: Partial<IdeasCreateResponseDto>,
  ): Promise<IdeasResponseDto> {
    this.logger.log(JSON.stringify(body))
    return this.ideasService.updateIdea(id, body);
  }

  @Delete('/:id')
  deleteIdea(
    @Param('id', ParseUUIDPipe) id: number,
  ): Promise<IdeasResponseDto> {
    return this.ideasService.deleteIdea(id);
  }
}
