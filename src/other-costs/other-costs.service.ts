import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Brackets, EntityManager, Equal, Repository } from "typeorm";
import { OtherCosts } from "./other-costs.entity";
import { OtherCostsDto } from "./other-costs.dto";
import { CommonStatus } from "src/shared/shared.model";

@Injectable()
export class OtherCostsService {
  constructor(
    @InjectRepository(OtherCosts)
    private readonly otherCostsRepository: Repository<OtherCosts>,
    private readonly entityManager: EntityManager
  ) {}

  async createOrUpdateOtherCostss(payload: OtherCostsDto) {
    for (const day of payload.daysDate) {
      const { databaseDateFormat, amount } = day;

      // Check if a record with the specified date already exists
      let otherCosts = await this.otherCostsRepository.findOne({
        where: { date: databaseDateFormat },
      });

      if (otherCosts) {
        // Update existing record
        otherCosts.amount = amount ?? otherCosts.amount;
      } else {
        // Create new record
        otherCosts = this.otherCostsRepository.create({
          date: databaseDateFormat,
          amount: amount ?? 0, // Default to 0 if null
          status: CommonStatus.ACTIVE,
        });
      }

      // Save the record (insert if new, update if exists)
      await this.otherCostsRepository.save(otherCosts);
    }
    return { message: "Sell costs processed successfully" };
  }

  async getOtherCostssByDateRange(month: string): Promise<OtherCosts[]> {
    return this.otherCostsRepository.find({
      where: {
        date: Equal(month),
      },
      order: {
        date: "ASC",
      },
    });
  }
}
