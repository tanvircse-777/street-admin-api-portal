import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sell } from "./sell.entity";
import { SellService } from "./sell.service";
import { SellController } from "./sell.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Sell])],
  providers: [SellService],
  controllers: [SellController],
  exports: [SellService],
})
export class SellModule {}
