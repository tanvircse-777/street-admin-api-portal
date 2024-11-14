import { Body, Controller, Post, Get, Param } from "@nestjs/common";
import { BazarAttendance } from "./bazar-attendance.entity";
import { BazarAttendanceService } from "./bazar-attendance.service";
import { CreateOrUpdateBazarAttendanceDto } from "./bazar-attendance.dto";

@Controller("bazarAttendance")
export class BazarAttendanceController {
  constructor(private _bazarAttendanceService: BazarAttendanceService) {}

  @Get("by-date-range/:startDate/:endDate")
  getBazarAttendanceByDateRange(
    @Param("startDate") startDate: string,
    @Param("endDate") endDate: string
  ): Promise<BazarAttendance[]> {
    return this._bazarAttendanceService.getBazarAttendancesByDateRange(
      startDate,
      endDate
    );
  }

  @Post("create-or-update")
  async createOrUpdateSellCosts(
    @Body() payload: CreateOrUpdateBazarAttendanceDto
  ) {
    return this._bazarAttendanceService.createOrUpdateSellCosts(payload);
  }
}
