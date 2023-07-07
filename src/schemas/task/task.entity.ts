import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from '../category/categoty.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  dateStart: Date;

  @Column({ type: 'date' })
  dateEnd: Date;

  @ManyToOne(() => Category, (category) => category.tasks)
  category: Category;
}
