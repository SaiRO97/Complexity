import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column, ManyToOne, UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('ideas')
export class IdeaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @ManyToOne(type => UserEntity, author => author.ideas)
  author: UserEntity
}
