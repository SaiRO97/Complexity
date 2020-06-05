import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/ormconfig';
import { IdeasModule } from './modules/ideas/ideas.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), IdeasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
