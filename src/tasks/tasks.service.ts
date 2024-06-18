import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Task } from './task.entity';
import { UpdateTaskDto } from './tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly entityManager: EntityManager,
  ) {}

  async getAllTask(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async getTaskById(id: number): Promise<Task> {
    let task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} does not exist`);
    }
    return this.taskRepository.findOneBy({ id });
  }

  async createTask(task: Partial<Task>): Promise<Task> {
    const newTask = this.taskRepository.create(task);
    return this.taskRepository.save(newTask);
  }

  async deleteTask(id: number) {
    this.getTaskById(id);
    return this.taskRepository.delete(id);
  }

  async updateTask(id: number, requestBody: UpdateTaskDto) {
    let task: Task = await this.getTaskById(id);
    task.title = requestBody.title;
    task.status = requestBody.status;
    await this.entityManager.save(task);

    return task;
  }
}
