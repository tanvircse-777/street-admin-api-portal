import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MonthlyConfig } from "./monthly-config.entity";
import { MonthlyConfigService } from "./monthly-config.service";
import { MonthlyConfigController } from "./monthly-config.controller";

@Module({
  imports: [TypeOrmModule.forFeature([MonthlyConfig])],
  providers: [MonthlyConfigService],
  controllers: [MonthlyConfigController],
  exports: [MonthlyConfigService],
})
export class MonthlyConfigModule {}
