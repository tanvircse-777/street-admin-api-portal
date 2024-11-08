import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, EntityManager, IsNull, Not, Repository } from "typeorm";
import { Sell } from "./sell.entity";
import { UpdateSellDto } from "./sell.dto";
import { CommonStatus } from "src/shared/shared.model";

@Injectable()
export class SellService {
  constructor(
    @InjectRepository(Sell)
    private readonly sellRepository: Repository<Sell>,
    private readonly entityManager: EntityManager
  ) {}

  async getAllSell(): Promise<Sell[]> {
    const rawQuery = `SELECT * FROM sell where status = '${CommonStatus.ACTIVE}'`;
    return this.entityManager.query(rawQuery);
  }

  async getSellsByDateRange(
    startDate: string,
    endDate: string
  ): Promise<Sell[]> {
    return this.sellRepository.find({
      where: {
        date: Between(startDate, endDate),
      },
      order: {
        date: "ASC",
      },
    });
  }

  async getMonthlySalesByYear(
    year: string
  ): Promise<{ amount: number; month: string }[]> {
    return this.sellRepository
      .createQueryBuilder("sell")
      .select("SUM(sell.amount)", "amount")
      .addSelect(
        "TRIM(TO_CHAR(TO_DATE(sell.date, 'YYYY-MM-DD'), 'Month'))",
        "month"
      ) // Extract month name
      .where("EXTRACT(YEAR FROM TO_DATE(sell.date, 'YYYY-MM-DD')) = :year", {
        year,
      })
      .groupBy("TO_CHAR(TO_DATE(sell.date, 'YYYY-MM-DD'), 'Month')")
      .orderBy("MIN(sell.date)", "ASC")
      .getRawMany();
  }

  async getSellById(id: number): Promise<Sell> {
    let sell = await this.sellRepository.findOneBy({ id });
    if (!sell) {
      throw new NotFoundException(`Sell with id ${id} does not exist`);
    }
    return this.sellRepository.findOneBy({ id });
  }

  async createSell(sell: Partial<Sell>): Promise<Sell> {
    const newSell = this.sellRepository.create(sell);
    return this.sellRepository.save(newSell);
  }

  async deleteSell(id: number) {
    this.getSellById(id);
    return this.sellRepository.delete(id);
  }

  async updateSell(id: number, requestBody: UpdateSellDto) {
    let sell: Sell = await this.getSellById(id);
    await this.entityManager.save(sell);

    return sell;
  }
}
