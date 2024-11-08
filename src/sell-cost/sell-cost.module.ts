import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SellCost } from "./sell-cost.entity";
import { SellCostService } from "./sell-cost.service";
import { SellCostController } from "./sell-cost.controller";

@Module({
  imports: [TypeOrmModule.forFeature([SellCost])],
  providers: [SellCostService],
  controllers: [SellCostController],
  exports: [SellCostService],
})
export class SellCostModule {}
