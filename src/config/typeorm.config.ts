import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Accounts } from "src/accounts/accounts.entity";
import { Attendance } from "src/attendance/attendance.entity";
import { BazarAttendance } from "src/bazar-attendance/bazar-attendance.entity";
import { Customer } from "src/customer/customer.entity";
import { Feedback } from "src/feedback/feedback.entity";
import { MonthlyConfig } from "src/monthly-config/monthly-config.entity";
import { OtherCosts } from "src/other-costs/other-costs.entity";
import { OtherSells } from "src/other-sells/other-sells.entity";
import { SellCost } from "src/sell-cost/sell-cost.entity";
import { Sell } from "src/sell/sell.entity";
import { Transactions } from "src/transactions/transactions.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  // type: "postgres",
  // host: "localhost",
  // port: 5432,
  // username: "dbadmin",
  // password: "1234",
  // database: "task-management",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "streetadmin",
  password: "1234",
  database: "street_admin",
  entities: [
    Feedback,
    Customer,
    Sell,
    SellCost,
    OtherCosts,
    OtherSells,
    Attendance,
    BazarAttendance,
    MonthlyConfig,
    Accounts,
    Transactions,
  ],
  synchronize: true,
};
