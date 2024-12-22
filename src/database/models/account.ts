import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('float', { name: 'balance' })
  balance: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @OneToOne(() => User, (user) => user.account)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
