import { Module } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { FeedbackModule } from "./feedback/feedback.module";
import { CustomerModule } from "./customer/customer.module";
import { SellModule } from "./sell/sell.module";
import { SellCostModule } from "./sell-cost/sell-cost.module";
import { OtherCostsModule } from "./other-costs/other-costs.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
    FeedbackModule,
    CustomerModule,
    SellModule,
    SellCostModule,
    OtherCostsModule,
  ],
})
export class AppModule {}
