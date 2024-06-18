import { BaseEntity } from 'typeorm';
import { FeedbackStatus } from './feedback-status.enum';
export declare class Feedback extends BaseEntity {
    id: number;
    email: string;
    givenBy: string;
    feedback: string;
    status: FeedbackStatus;
    constructor(feedback?: Partial<Feedback>);
}
