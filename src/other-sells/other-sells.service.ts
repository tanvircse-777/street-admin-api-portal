import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  Between,
  EntityManager,
  Equal,
  IsNull,
  Not,
  Repository,
} from "typeorm";
import { OtherSells } from "./other-sells.entity";

import { CommonStatus } from "src/shared/shared.model";
import { OtherSellsDto } from "./other-sells.dto";

@Injectable()
export class OtherSellsService {
  constructor(
    @InjectRepository(OtherSells)
    private readonly otherSellsRepository: Repository<OtherSells>
  ) {}

  async getOtherSellsByMonth(month: string): Promise<OtherSells[]> {
    return this.otherSellsRepository.find({
      where: {
        date: Equal(month),
      },
      order: {
        date: "ASC",
      },
    });
  }

  async getOtherSellsByDateRange(
    startDate: string,
    endDate: string
  ): Promise<OtherSells[]> {
    return this.otherSellsRepository.find({
      where: {
        date: Between(startDate, endDate),
      },
      order: {
        date: "ASC",
      },
    });
  }

  async createOrUpdateOtherSells(payload: OtherSellsDto) {
    for (const cost of payload.sellsData) {
      const { id, date, title, amount } = cost;
      let otherCost;
      if (!id) {
        otherCost = this.otherSellsRepository.create({
          date: date,
          title: title ?? null,
          amount: amount ?? 0,
          status: CommonStatus.ACTIVE,
        });
      } else {
        // Check if a record with the specified date already exists
        otherCost = await this.otherSellsRepository.findOne({
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
      await this.otherSellsRepository.save(otherCost);
    }

    for (const id of payload.deletedSellsId) {
      // Check if a record with the specified date already exists
      let otherCost = await this.otherSellsRepository.findOne({
        where: { id: id },
      });

      if (otherCost) {
        // Delete the record
        await this.otherSellsRepository.delete(id);
      }
    }
    return { message: "Sell sells processed successfully" };
  }
}
