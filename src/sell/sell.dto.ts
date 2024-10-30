import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { CommonStatus } from "src/shared/shared.model";

export class CreateSellDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  amount: number;

  @IsNotEmpty()
  @IsString()
  @IsIn([CommonStatus.ACTIVE, CommonStatus.INACTIVE])
  status: CommonStatus;
}

export class UpdateSellDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  amount: number;

  @IsNotEmpty()
  @IsString()
  @IsIn([CommonStatus.ACTIVE, CommonStatus.INACTIVE])
  status: CommonStatus;
}
