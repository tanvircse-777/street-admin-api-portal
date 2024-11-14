import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { CommonStatus } from "src/shared/shared.model";

export class CreateOrUpdateBazarAttendanceDto {
  daysData: CreateOrUpdateBazarAttendanceRow[];
}

export class CreateOrUpdateBazarAttendanceRow {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  databaseDateFormat: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([CommonStatus.ACTIVE, CommonStatus.INACTIVE])
  status: CommonStatus;
}
