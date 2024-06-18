import { EntityManager, Repository } from 'typeorm';
import { Task } from './task.entity';
import { UpdateTaskDto } from './tasks.dto';
export declare class TasksService {
    private readonly taskRepository;
    private readonly entityManager;
    constructor(taskRepository: Repository<Task>, entityManager: EntityManager);
    getAllTask(): Promise<Task[]>;
    getTaskById(id: number): Promise<Task>;
    createTask(task: Partial<Task>): Promise<Task>;
    deleteTask(id: number): Promise<import("typeorm").DeleteResult>;
    updateTask(id: number, requestBody: UpdateTaskDto): Promise<Task>;
}
