import { FeedbackStatus } from './feedback-status.enum';
export declare class CreateFeedbackDto {
    givenBy: string;
    feedback: string;
}
export declare class UpdateFeedbackDto {
    givenBy: string;
    status: FeedbackStatus;
}
