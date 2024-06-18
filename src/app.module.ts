import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { FeedbackModule } from './feedback/feedback.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TasksModule, FeedbackModule,CustomerModule],
})
export class AppModule {}
