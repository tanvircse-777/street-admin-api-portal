// tasks/task.entity.ts
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.OEPN,
  })
  status: TaskStatus;

  constructor(task?: Partial<Task>) {
    super();
    if (task) {
      Object.assign(this, task);
    }
  }
}
