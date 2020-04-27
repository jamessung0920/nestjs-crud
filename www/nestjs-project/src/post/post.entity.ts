import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeUpdate } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  author: string;

  @Column({ default: true })
  isViewable: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at'})
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date;
  }
}