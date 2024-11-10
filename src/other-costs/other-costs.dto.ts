import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { CommonStatus } from "src/shared/shared.model";

export class OtherCostsDto {
  daysDate: OtherCostsRow[];
}

export class OtherCostsRow {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  databaseDateFormat: string;

  amount: number;

  @IsNotEmpty()
  @IsString()
  @IsIn([CommonStatus.ACTIVE, CommonStatus.INACTIVE])
  status: CommonStatus;
}

export class UpdateOtherCostsDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  amount: number;

  @IsNotEmpty()
  @IsString()
  @IsIn([CommonStatus.ACTIVE, CommonStatus.INACTIVE])
  status: CommonStatus;
}
