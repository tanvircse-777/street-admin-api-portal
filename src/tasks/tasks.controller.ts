import {
  Body,
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private _taskService: TasksService) {}
  @Get()
  getAllTasks(): Promise<Task[]> {
    return this._taskService.getAllTask();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: number): Promise<Task> {
    return this._taskService.getTaskById(Number(id));
  }

  @Post()
  // @UsePipes(ValidationPipe)
  createTask(@Body() requestBody: CreateTaskDto) {
    return this._taskService.createTask(requestBody);
  }

  @Delete('delete/:id')
  deleteTask(@Param('id') id: number) {
    return this._taskService.deleteTask(Number(id));
  }

  @Patch('update/:id')
  updateTask(@Param('id') id: number, @Body() requestBody: UpdateTaskDto) {
    return this._taskService.updateTask(Number(id), requestBody);
  }
}
