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
  ): Promise<MonthlyConfig> {
    return this._monthlyConfigService.getMonthlyConfigsByMonth(month);
  }

  @Patch("update-isAccountUpdated/:id")
  async updateIsAccountUpdated(
    @Param("id", ParseIntPipe) id: number, // Ensures the ID is a valid integer
    @Body("isAccountUpdated") isAccountUpdated: boolean // Extract `isAccountUpdated` from the request body
  ): Promise<{ message: string; data: MonthlyConfig }> {
    return await this._monthlyConfigService.updateIsAccountUpdated(
      id,
      isAccountUpdated
    );
  }
}
