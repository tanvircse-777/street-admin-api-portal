// monthlyConfigs/monthlyConfig.controller.ts
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
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
