import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeUpdate } from 'typeorm';
import { Transform } from "class-transformer";

@Entity({name: "posts"})
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(value => value.toUpperCase(), { toPlainOnly: true })
  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: 'unknown' })
  author: string;

  @Column({ default: true })
  isViewable: boolean;
 
  @Column({ type: 'timestamp', name: 'created_at'})
  createdAt: string;

  @Column({ type: 'timestamp', name: 'updated_at'})
  updatedAt: string;
}