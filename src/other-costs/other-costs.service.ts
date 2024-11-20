import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Brackets, EntityManager, Equal, Repository } from "typeorm";
import { OtherCosts } from "./other-costs.entity";
import { OtherCostsDto } from "./other-costs.dto";
import { CommonStatus } from "src/shared/shared.model";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class OtherCostsService {
  constructor(
    @InjectRepository(OtherCosts)
    private readonly otherCostsRepository: Repository<OtherCosts>,
    private readonly entityManager: EntityManager
  ) {}

  async getOtherCostsByMonth(month: string): Promise<OtherCosts[]> {
    return this.otherCostsRepository.find({
      where: {
        date: Equal(month),
      },
      order: {
        date: "ASC",
      },
    });
  }

  async createOrUpdateOtherCosts(payload: OtherCostsDto) {
    for (const cost of payload.costsData) {
      const { id, date, title, amount } = cost;
      let otherCost;
      if (!id) {
        otherCost = this.otherCostsRepository.create({
          date: date,
          title: title ?? null,
          amount: amount ?? 0,
          status: CommonStatus.ACTIVE,
        });
      } else {
        // Check if a record with the specified date already exists
        otherCost = await this.otherCostsRepository.findOne({
          where: { id: id },
        });

        if (otherCost) {
          // Update existing record
          otherCost.date = date ?? otherCost.date;
          otherCost.title = title ?? otherCost.title;
          otherCost.amount = amount ?? otherCost.amount;
        }
      }

      // Save the record (insert if new, update if exists)
      await this.otherCostsRepository.save(otherCost);
    }

    for (const id of payload.deletedCostsId) {
      // Check if a record with the specified date already exists
      let otherCost = await this.otherCostsRepository.findOne({
        where: { id: id },
      });

      if (otherCost) {
        // Delete the record
        await this.otherCostsRepository.delete(id);
      }
    }
    return { message: "Sell costs processed successfully" };
  }
}
