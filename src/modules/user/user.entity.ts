import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt: Date

  @Column({
    type: 'text',
    unique: true
  })
  username: string

  @Column('text')
  password: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  toResponseObject(showToken: boolean = false) {
    const { id, username, createdAt, token } = this;
    const userData = { id,username,createdAt }
    if(showToken){
      userData['token'] = token
    }
    return userData
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  private get token(){
    const { id,username } = this;
    return jwt.sign(
      {
        id,
        username
      },
      process.env.SECRET,
      {
        expiresIn: '7d'
      }
    )
  }

}