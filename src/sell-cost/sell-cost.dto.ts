import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { CommonStatus } from "src/shared/shared.model";

export class SellCostDto {
  daysDate: SellCostRow[];
}

export class SellCostRow {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  databaseDateFormat: string;

  

  sell: number;
  cost: number;

  @IsNotEmpty()
  @IsString()
  @IsIn([CommonStatus.ACTIVE, CommonStatus.INACTIVE])
  status: CommonStatus;
}

export class UpdateSellCostDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  amount: number;

  @IsNotEmpty()
  @IsString()
  @IsIn([CommonStatus.ACTIVE, CommonStatus.INACTIVE])
  status: CommonStatus;
}
