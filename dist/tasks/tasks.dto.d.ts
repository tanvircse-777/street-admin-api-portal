import { TaskStatus } from './task-status.enum';
export declare class CreateTaskDto {
    title: string;
    description: string;
}
export declare class UpdateTaskDto {
    title: string;
    status: TaskStatus;
}
