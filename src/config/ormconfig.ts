import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME,
  password: '',
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  logging: false,
};
