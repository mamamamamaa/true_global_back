import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Category } from '../category/categoty.entity';

enum UserRoles {
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.USER,
  })
  role: UserRoles;

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];
}
