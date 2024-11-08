import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Customer } from "src/customer/customer.entity";
import { Feedback } from "src/feedback/feedback.entity";
import { SellCost } from "src/sell-cost/sell-cost.entity";
import { Sell } from "src/sell/sell.entity";
import { Task } from "src/tasks/task.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "dbadmin",
  password: "1234",
  database: "task-management",
  entities: [Task, Feedback, Customer, Sell, SellCost],
  synchronize: true,
};
