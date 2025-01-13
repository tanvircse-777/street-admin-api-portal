// monthlyConfigs/monthlyConfig.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { CreateMonthlyConfigDto } from "./monthly-config.dto";
import { MonthlyConfig } from "./monthly-config.entity";
import { MonthlyConfigService } from "./monthly-config.service";

@Controller("monthly-config")
export class MonthlyConfigController {
  constructor(private readonly monthlyConfigService: MonthlyConfigService) {}

  // Get all monthly configurations
  @Get("list")
  async getAllMonthlyConfigs(): Promise<MonthlyConfig[]> {
    return await this.monthlyConfigService.getAllMonthlyConfigs();
  }

  @Get("by-month/:month")
  getMonthlyConfigsByMonth(
    @Param("month") month: string
  ): Promise<MonthlyConfig> {
    return this.monthlyConfigService.getMonthlyConfigsByMonth(month);
  }

  @Patch("update-isAccountUpdated/:id")
  async updateIsAccountUpdated(
    @Param("id", ParseIntPipe) id: number, // Ensures the ID is a valid integer
    @Body("isAccountUpdated") isAccountUpdated: boolean // Extract `isAccountUpdated` from the request body
  ): Promise<{ message: string; data: MonthlyConfig }> {
    return await this.monthlyConfigService.updateIsAccountUpdated(
      id,
      isAccountUpdated
    );
  }

  // Get a specific monthly configuration by ID
  @Get("by-id/:id")
  async getMonthlyConfigById(@Param("id") id: number): Promise<MonthlyConfig> {
    return await this.monthlyConfigService.getMonthlyConfigById(id);
  }

  @Post("create")
  async createMonthlyConfig(
    @Body() payload: CreateMonthlyConfigDto
  ): Promise<{ message: string; data: MonthlyConfig }> {
    return await this.monthlyConfigService.createMonthlyConfig(payload);
  }
}
