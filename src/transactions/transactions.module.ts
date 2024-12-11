import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transactions } from "./transactions.entity";
import { TransactionsService } from "./transactions.service";
import { TransactionsController } from "./transactions.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Transactions])],
  providers: [TransactionsService],
  controllers: [TransactionsController],
  exports: [TransactionsService],
})
export class TransactionsModule {}
