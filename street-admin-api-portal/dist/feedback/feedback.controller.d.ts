import { Feedback } from './feedback.entity';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto, UpdateFeedbackDto } from './feedback.dto';
export declare class FeedbackController {
    private _feedbackService;
    constructor(_feedbackService: FeedbackService);
    getAllFeedback(): Promise<Feedback[]>;
    getFeedbackById(id: number): Promise<Feedback>;
    createFeedback(requestBody: CreateFeedbackDto): Promise<Feedback>;
    deleteFeedback(id: number): Promise<import("typeorm").DeleteResult>;
    updateFeedback(id: number, requestBody: UpdateFeedbackDto): Promise<Feedback>;
}
