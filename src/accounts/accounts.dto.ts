import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { CommonStatus } from "src/shared/shared.model";

export class UpdateAccountsDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  amount: number;

  @IsNotEmpty()
  @IsString()
  @IsIn([CommonStatus.ACTIVE, CommonStatus.INACTIVE])
  status: CommonStatus;
}

export enum AccountType {
  CHERITABLE_FUND = "charitable_fund",
  RAMZAN_FUND = "ramzan_fund",
  BALANCE = "main_balance",
  INDIVIDUAL = "individual",
}
