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
import { OtherCosts } from "./other-costs.entity";
import { OtherCostsDto, UpdateOtherCostsDto } from "./other-costs.dto";
import { CommonStatus } from "src/shared/shared.model";

@Injectable()
export class OtherCostsService {
  constructor(
    @InjectRepository(OtherCosts)
    private readonly otherCostsRepository: Repository<OtherCosts>,
    private readonly entityManager: EntityManager
  ) {}

  async getAllOtherCosts(): Promise<OtherCosts[]> {
    const rawQuery = `SELECT * FROM other_costs where status = '${CommonStatus.ACTIVE}'`;
    return this.entityManager.query(rawQuery);
  }

  async createOrUpdateOtherCostss(payload: OtherCostsDto) {
    for (const day of payload.daysDate) {
      const { databaseDateFormat, sell, cost } = day;

      // Check if a record with the specified date already exists
      let otherCosts = await this.otherCostsRepository.findOne({
        where: { date: databaseDateFormat },
      });

      if (otherCosts) {
        // Update existing record
        otherCosts.sell = sell ?? otherCosts.sell;
        otherCosts.cost = cost ?? otherCosts.cost;
      } else {
        // Create new record
        otherCosts = this.otherCostsRepository.create({
          date: databaseDateFormat,
          sell: sell ?? 0, // Default to 0 if null
          cost: cost ?? 0, // Default to 0 if null
          status: CommonStatus.ACTIVE,
        });
      }

      // Save the record (insert if new, update if exists)
      await this.otherCostsRepository.save(otherCosts);
    }
    return { message: "Sell costs processed successfully" };
  }

  async getOtherCostssByDateRange(
    startDate: string,
    endDate: string
  ): Promise<OtherCosts[]> {
    return this.otherCostsRepository.find({
      where: {
        date: Between(startDate, endDate),
      },
      order: {
        date: "ASC",
      },
    });
  }

  // async getOtherCostssByDateRangeForChart(
  //   startDate: string,
  //   endDate: string
  // ): Promise<OtherCosts[]> {
  //   return this.otherCostsRepository.find({
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

  async getOtherCostssByDateRangeForChart(
    startDate: string,
    endDate: string
  ): Promise<OtherCosts[]> {
    return this.otherCostsRepository
      .createQueryBuilder("otherCosts")
      .where("otherCosts.date BETWEEN :startDate AND :endDate", {
        startDate,
        endDate,
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where("otherCosts.sell != :zero", { zero: 0 }).orWhere(
            "otherCosts.cost != :zero",
            { zero: 0 }
          );
        })
      )
      .orderBy("otherCosts.date", "ASC")
      .getMany();
  }

  async getOtherCostsById(id: number): Promise<OtherCosts> {
    let otherCosts = await this.otherCostsRepository.findOneBy({ id });
    if (!otherCosts) {
      throw new NotFoundException(`OtherCosts with id ${id} does not exist`);
    }
    return this.otherCostsRepository.findOneBy({ id });
  }

  async createOtherCosts(otherCosts: Partial<OtherCosts>): Promise<OtherCosts> {
    const newOtherCosts = this.otherCostsRepository.create(otherCosts);
    return this.otherCostsRepository.save(newOtherCosts);
  }


}
