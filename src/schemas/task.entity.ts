import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './categoty.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'date', nullable: false })
  date_start: Date;

  @Column({ type: 'date', nullable: false })
  date_end: Date;

  @ManyToOne(() => Category, (category) => category.tasks)
  category: Category;
}
