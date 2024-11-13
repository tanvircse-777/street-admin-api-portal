import { Module } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { FeedbackModule } from "./feedback/feedback.module";
import { CustomerModule } from "./customer/customer.module";
import { SellModule } from "./sell/sell.module";
import { SellCostModule } from "./sell-cost/sell-cost.module";
import { OtherCostsModule } from "./other-costs/other-costs.module";
import { AttendanceModule } from "./attendance/attendance.module";
import { OtherSellsModule } from "./other-sells/other-sells.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
    FeedbackModule,
    CustomerModule,
    SellModule,
    SellCostModule,
    OtherCostsModule,
    OtherSellsModule,
    AttendanceModule,
  ],
})
export class AppModule {}
