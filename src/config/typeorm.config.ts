import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Customer } from "src/customer/customer.entity";
import { Feedback } from "src/feedback/feedback.entity";
import { Task } from "src/tasks/task.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "cppgl6uehbks73c2bjkg-a.oregon-postgres.render.com",
  port: 5432,
  username: "street_admin_database_user",
  password: "uKzXF4qqPIPssy9Uka2sNQ13jbUmbgpz",
  database: "street_admin_database",
  entities: [Task, Feedback, Customer],
  synchronize: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
