import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { Feedback } from './feedback.entity';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto, UpdateFeedbackDto } from './feedback.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private _feedbackService: FeedbackService) {}
  @Get()
  getAllFeedback(): Promise<Feedback[]> {
    return this._feedbackService.getAllFeedback();
  }

  @Get('/:id')
  getFeedbackById(@Param('id') id: number): Promise<Feedback> {
    return this._feedbackService.getFeedbackById(Number(id));
  }

  @Post()
  // @UsePipes(ValidationPipe)
  createFeedback(@Body() requestBody: CreateFeedbackDto) {
    return this._feedbackService.createFeedback(requestBody);
  }

  @Delete('delete/:id')
  deleteFeedback(@Param('id') id: number) {
    return this._feedbackService.deleteFeedback(Number(id));
  }

  @Patch('update/:id')
  updateFeedback(
    @Param('id') id: number,
    @Body() requestBody: UpdateFeedbackDto,
  ) {
    return this._feedbackService.updateFeedback(Number(id), requestBody);
  }
}
