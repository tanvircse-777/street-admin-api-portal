import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  And,
  Between,
  Brackets,
  EntityManager,
  Equal,
  IsNull,
  MoreThan,
  Not,
  Or,
  Repository,
} from "typeorm";
import { SellCost } from "./sell-cost.entity";
import { SellCostDto, UpdateSellCostDto } from "./sell-cost.dto";
import { CommonStatus } from "src/shared/shared.model";

@Injectable()
export class SellCostService {
  constructor(
    @InjectRepository(SellCost)
    private readonly sellCostRepository: Repository<SellCost>,
    private readonly entityManager: EntityManager
  ) {}

  async getAllSellCost(): Promise<SellCost[]> {
    const rawQuery = `SELECT * FROM sell_cost where status = '${CommonStatus.ACTIVE}'`;
    return this.entityManager.query(rawQuery);
  }

  async createOrUpdateSellCosts(payload: SellCostDto) {
    for (const day of payload.daysDate) {
      const { databaseDateFormat, sell, cost } = day;

      // Check if a record with the specified date already exists
      let sellCost = await this.sellCostRepository.findOne({
        where: { date: databaseDateFormat },
      });

      if (sellCost) {
        // Update existing record
        sellCost.sell = sell ?? sellCost.sell;
        sellCost.cost = cost ?? sellCost.cost;
      } else {
        // Create new record
        sellCost = this.sellCostRepository.create({
          date: databaseDateFormat,
          sell: sell ?? 0, // Default to 0 if null
          cost: cost ?? 0, // Default to 0 if null
          status: CommonStatus.ACTIVE,
        });
      }

      // Save the record (insert if new, update if exists)
      await this.sellCostRepository.save(sellCost);
    }
    return { message: "Sell costs processed successfully" };
  }

  async getSellCostsByDateRange(
    startDate: string,
    endDate: string
  ): Promise<SellCost[]> {
    return this.sellCostRepository.find({
      where: {
        date: Between(startDate, endDate),
      },
      order: {
        date: "ASC",
      },
    });
  }

  // async getSellCostsByDateRangeForChart(
  //   startDate: string,
  //   endDate: string
  // ): Promise<SellCost[]> {
  //   return this.sellCostRepository.find({
  //     where: {
  //       date: Between(startDate, endDate),
  //       // sell: Or(Not(0), Not(IsNull())),
  //       // cost: Or(Not(0), Not(IsNull())),
  //       sell: Or(Not(0), Not(0)),
  //       cost: Or(Not(0), Not(0)),
  //     },
  //     order: {
  //       date: "ASC",
  //     },
  //   });
  // }

  async getSellCostsByDateRangeForChart(
    startDate: string,
    endDate: string
  ): Promise<SellCost[]> {
    return this.sellCostRepository
      .createQueryBuilder("sellCost")
      .where("sellCost.date BETWEEN :startDate AND :endDate", {
        startDate,
        endDate,
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where("sellCost.sell != :zero", { zero: 0 }).orWhere(
            "sellCost.cost != :zero",
            { zero: 0 }
          );
        })
      )
      .orderBy("sellCost.date", "ASC")
      .getMany();
  }

  async getSellCostById(id: number): Promise<SellCost> {
    let sellCost = await this.sellCostRepository.findOneBy({ id });
    if (!sellCost) {
      throw new NotFoundException(`SellCost with id ${id} does not exist`);
    }
    return this.sellCostRepository.findOneBy({ id });
  }

  async createSellCost(sellCost: Partial<SellCost>): Promise<SellCost> {
    const newSellCost = this.sellCostRepository.create(sellCost);
    return this.sellCostRepository.save(newSellCost);
  }

  async deleteSellCost(id: number) {
    this.getSellCostById(id);
    return this.sellCostRepository.delete(id);
  }

  async updateSellCost(id: number, requestBody: UpdateSellCostDto) {
    let sellCost: SellCost = await this.getSellCostById(id);
    await this.entityManager.save(sellCost);

    return sellCost;
  }
}
