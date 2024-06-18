import { IsIn, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { TaskStatus } from './task-status.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'title must be at least 5 characters long' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'description must be at least 10 characters long' })
  description: string;
}

export class UpdateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  
  @IsNotEmpty()
  @IsString()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OEPN])
  status: TaskStatus;
}
