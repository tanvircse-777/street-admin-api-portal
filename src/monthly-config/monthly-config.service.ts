// monthlyConfigs/monthlyConfig.service.ts
import { Injectable } from "@nestjs/common";
import { CreateMonthlyConfigDto } from "./monthly-config.dto";
import { MonthlyConfig } from "./monthly-config.entity";
import { CommonStatus } from "src/shared/shared.model";

@Injectable()
export class MonthlyConfigService {
  async getAllMonthlyConfigs(): Promise<MonthlyConfig[]> {
    try {
      return await MonthlyConfig.find();
    } catch (error) {
      throw new Error("Failed to retrieve monthly configurations");
    }
  }

  // Retrieve a specific monthly configuration by ID
  async getMonthlyConfigById(id: number): Promise<MonthlyConfig> {
    try {
      const config = await MonthlyConfig.findOne({ where: { id } });
      if (!config) {
        throw new Error("Monthly configuration not found");
      }
      return config;
    } catch (error) {
      throw new Error("Failed to retrieve the monthly configuration");
    }
  }

  async createMonthlyConfig(
    payload: CreateMonthlyConfigDto
  ): Promise<{ message: string; data: MonthlyConfig }> {
    payload.status = CommonStatus.ACTIVE;
    payload.isAccountUpdated = false;

    const newConfig = new MonthlyConfig(payload);

    try {
      await newConfig.save();
      return {
        message: "Monthly configuration created successfully",
        data: newConfig,
      };
    } catch (error) {
      throw new Error("Failed to create monthly configuration");
    }
  }
}
