// feedbacks/feedback.entity.ts
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FeedbackStatus } from './feedback-status.enum';

@Entity()
export class Feedback extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  givenBy: string;

  @Column()
  feedback: string;

  @Column({
    type: 'enum',
    enum: FeedbackStatus,
    default: FeedbackStatus.ACTIVE,
  })
  status: FeedbackStatus;

  constructor(feedback?: Partial<Feedback>) {
    super();
    if (feedback) {
      Object.assign(this, feedback);
    }
  }
}
