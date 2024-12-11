import { IsDate, IsIn, IsNotEmpty, isNumber, IsString } from "class-validator";
import { CommonStatus } from "src/shared/shared.model";
import { Timestamp } from "typeorm";

export enum TransationType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

export class CreateTransactionsDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  @IsString()
  @IsIn([CommonStatus.ACTIVE, CommonStatus.INACTIVE])
  status: CommonStatus;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  year: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([TransationType.DEPOSIT, TransationType.WITHDRAW], {
    message: "Transaction type must be deposit or withdraw",
  })
  transactionType: TransationType;

  @IsNotEmpty()
  transactionDate: Date;

  @IsNotEmpty({ message: "Account Id Can not be empty" })
  accountId: number;
}
