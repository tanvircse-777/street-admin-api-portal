import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { OtherCosts } from "./other-costs.entity";
import { OtherCostsService } from "./other-costs.service";
import { OtherCostsDto, UpdateOtherCostsDto } from "./other-costs.dto";

@Controller("other-costs")
export class OtherCostsController {
  constructor(private _otherCostsService: OtherCostsService) {}
  @Get()
  getAllOtherCosts(): Promise<OtherCosts[]> {
    return this._otherCostsService.getAllOtherCosts();
  }

  @Get("/:id")
  getOtherCostsById(@Param("id") id: number): Promise<OtherCosts> {
    return this._otherCostsService.getOtherCostsById(Number(id));
  }

  @Get("by-date-range/:startDate/:endDate")
  getOtherCostsByDateRange(
    @Param("startDate") startDate: string,
    @Param("endDate") endDate: string
  ): Promise<OtherCosts[]> {
    return this._otherCostsService.getOtherCostssByDateRange(startDate, endDate);
  }

  @Get("by-date-range-for-chart/:startDate/:endDate")
  getOtherCostssByDateRangeForChart(
    @Param("startDate") startDate: string,
    @Param("endDate") endDate: string
  ): Promise<OtherCosts[]> {
    return this._otherCostsService.getOtherCostssByDateRangeForChart(
      startDate,
      endDate
    );
  }

  @Post("create-or-update")
  async createOrUpdateOtherCostss(@Body() payload: OtherCostsDto) {
    return this._otherCostsService.createOrUpdateOtherCostss(payload);
  }
}
