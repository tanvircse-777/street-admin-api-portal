import { IsIn, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { FeedbackStatus } from './feedback-status.enum';

export class CreateFeedbackDto {
  @IsNotEmpty()
  @IsString()
  givenBy: string;

  @IsNotEmpty()
  @IsString()
  feedback: string;
}

export class UpdateFeedbackDto {
  @IsNotEmpty()
  @IsString()
  givenBy: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([FeedbackStatus.ACTIVE, FeedbackStatus.INACTIVE])
  status: FeedbackStatus;
}
