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
import { CreateOrUpdateAttendanceDto } from "./attendance.dto";

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

  @Post("create-or-update")
  async createOrUpdateSellCosts(@Body() payload: CreateOrUpdateAttendanceDto) {
    return this._attendanceService.createOrUpdateSellCosts(payload);
  }
}
