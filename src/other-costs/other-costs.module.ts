import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OtherCosts } from "./other-costs.entity";
import { OtherCostsService } from "./other-costs.service";
import { OtherCostsController } from "./other-costs.controller";

@Module({
  imports: [TypeOrmModule.forFeature([OtherCosts])],
  providers: [OtherCostsService],
  controllers: [OtherCostsController],
  exports: [OtherCostsService],
})
export class OtherCostsModule {}
