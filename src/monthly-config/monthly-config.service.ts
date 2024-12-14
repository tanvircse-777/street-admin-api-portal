import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Brackets, EntityManager, Equal, Repository } from "typeorm";
import { MonthlyConfig } from "./monthly-config.entity";
import { MonthlyConfigDto } from "./monthly-config.dto";
import { CommonStatus } from "src/shared/shared.model";

@Injectable()
export class MonthlyConfigService {
  constructor(
    @InjectRepository(MonthlyConfig)
    private readonly monthlyConfigRepository: Repository<MonthlyConfig>,
    private readonly entityManager: EntityManager
  ) {}

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
}
