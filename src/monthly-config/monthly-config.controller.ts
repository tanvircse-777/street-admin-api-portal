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
import { MonthlyConfig } from "./monthly-config.entity";
import { MonthlyConfigService } from "./monthly-config.service";
import { MonthlyConfigDto } from "./monthly-config.dto";

@Controller("monthly-config")
export class MonthlyConfigController {
  constructor(private _monthlyConfigService: MonthlyConfigService) {}

  @Get("by-month/:month")
  getMonthlyConfigsByMonth(
    @Param("month") month: string
  ): Promise<MonthlyConfig[]> {
    return this._monthlyConfigService.getMonthlyConfigsByMonth(month);
  }

  @Post("create-or-update")
  async createOrUpdateMonthlyConfigs(@Body() payload: MonthlyConfigDto) {
    return this._monthlyConfigService.createOrUpdateMonthlyConfigs(payload);
  }
}
