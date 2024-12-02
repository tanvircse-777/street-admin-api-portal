import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Accounts } from "./accounts.entity";
import { AccountsService } from "./accounts.service";
import { AccountsController } from "./accounts.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Accounts])],
  providers: [AccountsService],
  controllers: [AccountsController],
  exports: [AccountsService],
})
export class AccountsModule {}
