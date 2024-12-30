import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { FeedbackModule } from "./feedback/feedback.module";
import { CustomerModule } from "./customer/customer.module";
import { SellModule } from "./sell/sell.module";
import { SellCostModule } from "./sell-cost/sell-cost.module";
import { OtherCostsModule } from "./other-costs/other-costs.module";
import { AttendanceModule } from "./attendance/attendance.module";
import { OtherSellsModule } from "./other-sells/other-sells.module";
import { BazarAttendanceModule } from "./bazar-attendance/bazar-attendance.module";
import { MonthlyConfigModule } from "./monthly-config/monthly-config.module";
import { AccountsModule } from "./accounts/accounts.module";
import { TransactionsModule } from "./transactions/transactions.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    FeedbackModule,
    CustomerModule,
    SellModule,
    SellCostModule,
    OtherCostsModule,
    OtherSellsModule,
    AttendanceModule,
    BazarAttendanceModule,
    MonthlyConfigModule,
    AccountsModule,
    TransactionsModule
  ],
})
export class AppModule {}
