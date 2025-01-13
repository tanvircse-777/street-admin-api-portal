// monthlyConfigs/monthlyConfig.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMonthlyConfigDto } from "./monthly-config.dto";
import { MonthlyConfig } from "./monthly-config.entity";
import { CommonStatus } from "src/shared/shared.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, EntityManager, Equal } from "typeorm";

@Injectable()
export class MonthlyConfigService {
  constructor(
    @InjectRepository(MonthlyConfig)
    private readonly monthlyConfigRepository: Repository<MonthlyConfig>,
    private readonly entityManager: EntityManager
  ) {}

  async getAllMonthlyConfigs(): Promise<MonthlyConfig[]> {
    try {
      return await MonthlyConfig.find();
    } catch (error) {
      throw new Error("Failed to retrieve monthly configurations");
    }
  }

  async getMonthlyConfigsByMonth(month: string): Promise<MonthlyConfig> {
    return this.monthlyConfigRepository.findOne({
      where: {
        month: Equal(month),
      },
      order: {
        month: "ASC",
      },
    });
  }

  // async updateIsAccountUpdated(
  //   id: number,
  //   isAccountUpdated: boolean
  // ): Promise<MonthlyConfig> {
  //   // Find the record by ID
  //   const monthlyConfig = await this.monthlyConfigRepository.findOne({
  //     where: { id },
  //   });

  //   if (!monthlyConfig) {
  //     throw new NotFoundException(`MonthlyConfig with ID ${id} not found`);
  //   }

  //   // Update the isAccountUpdated field
  //   monthlyConfig.isAccountUpdated = isAccountUpdated;

  //   // Save the updated record
  //   return await this.monthlyConfigRepository.save(monthlyConfig);
  // }

  async updateIsAccountUpdated(
    id: number,
    isAccountUpdated: boolean
  ): Promise<{ message: string; data: MonthlyConfig }> {
    // Find the record by ID
    const monthlyConfig = await this.monthlyConfigRepository.findOne({
      where: { id },
    });

    if (!monthlyConfig) {
      throw new NotFoundException(`MonthlyConfig with ID ${id} not found`);
    }

    // Update the isAccountUpdated field
    monthlyConfig.isAccountUpdated = isAccountUpdated;

    // Save the updated record
    const updatedConfig =
      await this.monthlyConfigRepository.save(monthlyConfig);

    // Return success message along with the updated record
    return {
      message: "isAccountUpdated field updated successfully",
      data: updatedConfig,
    };
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
