import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CommonStatus } from "src/shared/shared.model";

export class CreateOrUpdateOtherSellsDto {
  daysData: CreateOrUpdateOtherSellsRow[];
}

export class CreateOrUpdateOtherSellsRow {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  databaseDateFormat: string;

  @IsString()
  title: string;

  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  @IsIn([CommonStatus.ACTIVE, CommonStatus.INACTIVE])
  status: CommonStatus;
}

export class UpdateOtherSellsDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  amount: number;

  @IsNotEmpty()
  @IsString()
  @IsIn([CommonStatus.ACTIVE, CommonStatus.INACTIVE])
  status: CommonStatus;
}
