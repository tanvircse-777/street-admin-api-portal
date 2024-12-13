import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CommonStatus } from "src/shared/shared.model";

export class MonthlyConfigDto {
  costsData: MonthlyConfigRow[];
  deletedCostsId: number[];
}

export class MonthlyConfigRow {
  id: number;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  config_for: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  @IsIn([CommonStatus.ACTIVE, CommonStatus.INACTIVE])
  status: CommonStatus;
}

export class UpdateMonthlyConfigDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  amount: number;

  @IsNotEmpty()
  @IsString()
  @IsIn([CommonStatus.ACTIVE, CommonStatus.INACTIVE])
  status: CommonStatus;
}

export enum ConfigFor {
  BAZAR_BONUS_PER_DAY = "bazar_bonus_per_day",
  TIME_BASE_BONUS_PER_HOUR = "time_base_bonus_per_hour",
  CHARITABLE_PERCENTAGE = "charitable_percentage",
  RAMZAN_FUND = "ramzan_fund",
}
