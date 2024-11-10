import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
} from "@nestjs/common";
import { Attendance } from "./attendance.entity";
import { AttendanceService } from "./attendance.service";
import { CreateAttendanceDto, UpdateAttendanceDto } from "./attendance.dto";

@Controller("attendance")
export class AttendanceController {
  constructor(private _attendanceService: AttendanceService) {}

  @Get("by-date-range/:startDate/:endDate")
  getAttendanceByDateRange(
    @Param("startDate") startDate: string,
    @Param("endDate") endDate: string
  ): Promise<Attendance[]> {
    return this._attendanceService.getAttendancesByDateRange(
      startDate,
      endDate
    );
  }

  // @Post("create-or-update")
  // async createOrUpdateSellCosts(@Body() payload: CreateAttendanceDto) {
  //   return this._attendanceService.createOrUpdateSellCosts(payload);
  // }
}
