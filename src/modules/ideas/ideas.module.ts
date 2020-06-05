import { Module } from '@nestjs/common';
import { IdeasController } from './ideas.controller';
import { IdeasService } from './ideas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeaEntity } from './ideas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaEntity])],
  controllers: [IdeasController],
  providers: [IdeasService],
})
export class IdeasModule {}
