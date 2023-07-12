import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Category } from './categoty.entity';
import { IsString } from 'class-validator';

enum UserRoles {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.USER,
  })
  role: UserRoles;

  @Column({ type: 'varchar', default: null })
  @IsString()
  access_token: string;

  @OneToMany(() => Category, (category) => category.user, { cascade: true })
  categories: Category[];
}
