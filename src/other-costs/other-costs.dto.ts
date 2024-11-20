import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CommonStatus } from "src/shared/shared.model";

export class OtherCostsDto {
  costsData: OtherCostsRow[];
  deletedCostsId: number[];
}

export class OtherCostsRow {
  id: number;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  @IsIn([CommonStatus.ACTIVE, CommonStatus.INACTIVE])
  status: CommonStatus;
}

