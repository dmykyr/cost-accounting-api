import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user';
import { Category } from './category';

@Entity('records')
export class Record {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('int', { name: 'category_id' })
  categoryId: number;

  @Column('date', { name: 'created_at' })
  createdAt: Date;

  @Column('float')
  spendingCosts: number;

  @ManyToOne(() => User, (user) => user.records)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Category, (category) => category.records)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
