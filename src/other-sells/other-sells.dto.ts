import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CommonStatus } from "src/shared/shared.model";

export class OtherSellsDto {
  sellsData: OtherSellsRow[];
  deletedSellsId: number[];
}

export class OtherSellsRow {
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