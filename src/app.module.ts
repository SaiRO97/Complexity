import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/ormconfig';
import { IdeaModule } from './ideas/idea/idea.module';
import { IdeaModule } from './modules/ideas/idea/idea.module';
import { IdeasModule } from './modules/ideas/ideas.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), IdeaModule, IdeasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
