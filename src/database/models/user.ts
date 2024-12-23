import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Record } from './record';
import { Account } from './account';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 200 })
  name: string;

  @Column('varchar', { name: 'password', length: 200, default: '' })
  password: string;

  @OneToMany(() => Record, (record) => record.user)
  records: Record[];

  @OneToOne(() => Account, (account) => account.user)
  account: Account;
}
