import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Feedback } from 'src/feedback/feedback.entity';
import { Task } from 'src/tasks/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dbadmin',
  password: '1234',
  database: 'task-management',
  entities: [Task, Feedback],
  synchronize: true,
};
