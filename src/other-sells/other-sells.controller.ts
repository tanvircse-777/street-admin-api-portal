import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
} from "@nestjs/common";
import { OtherSells } from "./other-sells.entity";
import { OtherSellsService } from "./other-sells.service";
import { OtherSellsDto } from "./other-sells.dto";

@Controller("other-sells")
export class OtherSellsController {
  constructor(private _otherSellsService: OtherSellsService) {}

  @Get("by-month/:month")
  getOtherSellsByMonth(@Param("month") month: string): Promise<OtherSells[]> {
    return this._otherSellsService.getOtherSellsByMonth(month);
  }

  @Get("by-date-range/:startDate/:endDate")
  getOtherSellsByDateRange(
    @Param("startDate") startDate: string,
    @Param("endDate") endDate: string
  ): Promise<OtherSells[]> {
    return this._otherSellsService.getOtherSellsByDateRange(startDate, endDate);
  }

  @Post("create-or-update")
  async createOrUpdateOtherSellss(@Body() payload: OtherSellsDto) {
    return this._otherSellsService.createOrUpdateOtherSells(payload);
  }
}
