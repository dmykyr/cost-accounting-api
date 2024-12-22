import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Record } from './record';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 200 })
  name: string;

  @OneToMany(() => Record, (record) => record.category)
  records: Record[];
}
