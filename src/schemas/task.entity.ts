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
  dateStart: Date;

  @Column({ type: 'date', nullable: false })
  dateEnd: Date;

  @ManyToOne(() => Category, (category) => category.tasks)
  category: Category;
}
