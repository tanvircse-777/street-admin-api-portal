import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { CommonStatus } from "src/shared/shared.model";


export class CreateOrUpdateAttendanceDto {
  daysData: CreateOrUpdateAttendanceRow[];
}

export class CreateOrUpdateAttendanceRow {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  databaseDateFormat: string;

  tanvirInTime: string;
  tanvirOutTime: string;

  shakilInTime: string;
  shakilOutTime: string;

  tarikInTime: string;
  tarikOutTime: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([CommonStatus.ACTIVE, CommonStatus.INACTIVE])
  status: CommonStatus;
}

export class UpdateAttendanceDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  amount: number;

  @IsNotEmpty()
  @IsString()
  @IsIn([CommonStatus.ACTIVE, CommonStatus.INACTIVE])
  status: CommonStatus;
}
