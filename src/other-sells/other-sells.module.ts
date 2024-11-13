import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OtherSells } from "./other-sells.entity";
import { OtherSellsService } from "./other-sells.service";
import { OtherSellsController } from "./other-sells.controller";

@Module({
  imports: [TypeOrmModule.forFeature([OtherSells])],
  providers: [OtherSellsService],
  controllers: [OtherSellsController],
  exports: [OtherSellsService],
})
export class OtherSellsModule {}
