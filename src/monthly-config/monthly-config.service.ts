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

  // async createOrUpdateMonthlyConfigs(payload: MonthlyConfigDto) {
  //   for (const cost of payload.costsData) {
  //     const { id, date, title, config_for, amount } = cost;
  //     let otherCost;
  //     if (!id) {
  //       otherCost = this.monthlyConfigRepository.create({
  //         month: date,
  //         title: title,
  //         config_for: config_for,
  //         amount: amount ?? 0,
  //         status: CommonStatus.ACTIVE,
  //       });
  //     } else {
  //       // Check if a record with the specified date already exists
  //       otherCost = await this.monthlyConfigRepository.findOne({
  //         where: { id: id },
  //       });

  //       if (otherCost) {
  //         // Update existing record
  //         otherCost.date = date ?? otherCost.date;
  //         otherCost.title = title ?? otherCost.title;
  //         otherCost.config_for = config_for ?? otherCost.config_for;
  //         otherCost.amount = amount ?? otherCost.amount;
  //       }
  //     }

  //     // Save the record (insert if new, update if exists)
  //     await this.monthlyConfigRepository.save(otherCost);
  //   }

  //   for (const id of payload.deletedCostsId) {
  //     // Check if a record with the specified date already exists
  //     let otherCost = await this.monthlyConfigRepository.findOne({
  //       where: { id: id },
  //     });

  //     if (otherCost) {
  //       // Delete the record
  //       await this.monthlyConfigRepository.delete(id);
  //     }
  //   }
  //   return { message: "Sell costs processed successfully" };
  // }

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
}
