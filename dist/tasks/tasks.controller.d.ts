import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
export declare class TasksController {
    private _taskService;
    constructor(_taskService: TasksService);
    getAllTasks(): Promise<Task[]>;
    getTaskById(id: number): Promise<Task>;
    createTask(requestBody: CreateTaskDto): Promise<Task>;
    deleteTask(id: number): Promise<import("typeorm").DeleteResult>;
    updateTask(id: number, requestBody: UpdateTaskDto): Promise<Task>;
}
