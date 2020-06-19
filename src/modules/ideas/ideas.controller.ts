import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe, UsePipes, Logger, UseGuards,
} from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { IdeasCreateResponseDto, IdeasResponseDto } from './ideas.interfaces';
import { ValidationPipe } from '../../shared/validation/validation.pipe';
import { AuthGuard } from '../../shared/auth.guard';
import { User } from '../../decorators/user.decorator';

@Controller('api/ideas')
export class IdeasController {
  private logger = new Logger();
  constructor(private ideasService: IdeasService) {}

  @Get()
  getAll(): Promise<IdeasResponseDto[]> {
    return this.ideasService.getAll();
  }

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createIdea(@User('id') user, @Body() body: IdeasCreateResponseDto) {
    this.logger.log(JSON.stringify(body))
    return this.ideasService.createIdea(user, body);
  }

  @Get('/:id')
  getIdea(@Param('id', ParseUUIDPipe) id: number): Promise<IdeasResponseDto> {
    return this.ideasService.getIdea(id);
  }

  @Put('/:id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  updateIdea(
    @Param('id', ParseUUIDPipe) id: number,
    @User('id') user,
    @Body() body: Partial<IdeasCreateResponseDto>,
  ): Promise<IdeasResponseDto> {
    this.logger.log(JSON.stringify(body))
    return this.ideasService.updateIdea(id, user, body);
  }

  @Delete('/:id')
  @UseGuards(new AuthGuard())
  deleteIdea(
    @User('id') user,
    @Param('id', ParseUUIDPipe) id: number,
  ): Promise<IdeasResponseDto> {
    return this.ideasService.deleteIdea(user,id);
  }
}
