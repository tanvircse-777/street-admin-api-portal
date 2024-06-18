import { EntityManager, Repository } from 'typeorm';
import { Feedback } from './feedback.entity';
import { UpdateFeedbackDto } from './feedback.dto';
export declare class FeedbackService {
    private readonly feedbackRepository;
    private readonly entityManager;
    constructor(feedbackRepository: Repository<Feedback>, entityManager: EntityManager);
    getAllFeedback(): Promise<Feedback[]>;
    getFeedbackById(id: number): Promise<Feedback>;
    createFeedback(feedback: Partial<Feedback>): Promise<Feedback>;
    deleteFeedback(id: number): Promise<import("typeorm").DeleteResult>;
    updateFeedback(id: number, requestBody: UpdateFeedbackDto): Promise<Feedback>;
}
