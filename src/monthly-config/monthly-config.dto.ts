// monthlyConfigs/dto/create-monthly-config.dto.ts
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { CommonStatus } from "src/shared/shared.model";

export class CreateMonthlyConfigDto {
  @IsNotEmpty()
  @IsString()
  month: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  businessHour?: number;

  @IsOptional()
  @IsNumber()
  bazarBonusPerDay?: number;

  @IsOptional()
  @IsNumber()
  charitablePercentage?: number;

  @IsOptional()
  @IsNumber()
  ramzanFund?: number;

  @IsOptional()
  @IsString()
  managerId?: string;

  @IsOptional()
  @IsNumber()
  managerBonusPercentage?: number;

  @IsOptional()
  @IsNumber()
  equlaProfitPercentage?: number;

  @IsOptional()
  @IsNumber()
  improvementFundPercentage?: number;

  @IsOptional()
  @IsNumber()
  timeBaseBonusPercentage?: number;

  @IsOptional()
  @IsBoolean()
  isAccountUpdated?: boolean;

  @IsOptional()
  @IsEnum(CommonStatus)
  status?: CommonStatus;
}

export enum ConfigFor {
  BAZAR_BONUS_PER_DAY = "bazar_bonus_per_day",
  TIME_BASE_BONUS_PER_HOUR = "time_base_bonus_per_hour",
  CHARITABLE_PERCENTAGE = "charitable_percentage",
  RAMZAN_FUND = "ramzan_fund",
}
