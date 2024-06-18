import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Feedback } from './feedback.entity';
import { UpdateFeedbackDto } from './feedback.dto';
import { FeedbackStatus } from './feedback-status.enum';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
    private readonly entityManager: EntityManager,
  ) {}

  async getAllFeedback(): Promise<Feedback[]> {
    const rawQuery = `SELECT * FROM feedback where status = '${FeedbackStatus.ACTIVE}'`;
    return this.entityManager.query(rawQuery);
  }

  async getFeedbackById(id: number): Promise<Feedback> {
    let feedback = await this.feedbackRepository.findOneBy({ id });
    if (!feedback) {
      throw new NotFoundException(`Feedback with id ${id} does not exist`);
    }
    return this.feedbackRepository.findOneBy({ id });
  }

  async createFeedback(feedback: Partial<Feedback>): Promise<Feedback> {
    const newFeedback = this.feedbackRepository.create(feedback);
    return this.feedbackRepository.save(newFeedback);
  }

  async deleteFeedback(id: number) {
    this.getFeedbackById(id);
    return this.feedbackRepository.delete(id);
  }

  async updateFeedback(id: number, requestBody: UpdateFeedbackDto) {
    let feedback: Feedback = await this.getFeedbackById(id);
    feedback.givenBy = requestBody.givenBy;
    feedback.status = requestBody.status;
    await this.entityManager.save(feedback);

    return feedback;
  }
}
