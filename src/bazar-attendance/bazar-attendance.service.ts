import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, EntityManager, IsNull, Not, Repository } from "typeorm";
import { BazarAttendance } from "./bazar-attendance.entity";
import { CreateOrUpdateBazarAttendanceDto } from "./bazar-attendance.dto";
import { CommonStatus } from "src/shared/shared.model";

@Injectable()
export class BazarAttendanceService {
  constructor(
    @InjectRepository(BazarAttendance)
    private readonly bazarAttendanceRepository: Repository<BazarAttendance>,
    private readonly entityManager: EntityManager
  ) {}

  async getBazarAttendancesByDateRange(
    startDate: string,
    endDate: string
  ): Promise<BazarAttendance[]> {
    return this.bazarAttendanceRepository.find({
      where: {
        date: Between(startDate, endDate),
      },
      order: {
        date: "ASC",
      },
    });
  }

  async createOrUpdateSellCosts(payload: CreateOrUpdateBazarAttendanceDto) {
    for (const day of payload.daysData) {
      const { databaseDateFormat, userId } = day;

      // Check if a record with the specified date already exists
      let bazarAttendance = await this.bazarAttendanceRepository.findOne({
        where: { date: databaseDateFormat },
      });

      if (bazarAttendance) {
        // Update existing record
        bazarAttendance.userId = userId ?? bazarAttendance.userId;
      } else {
        // Create new record
        bazarAttendance = this.bazarAttendanceRepository.create({
          date: databaseDateFormat,
          userId: userId,
          status: CommonStatus.ACTIVE,
        } as BazarAttendance);
      }

      // Save the record (insert if new, update if exists)
      await this.bazarAttendanceRepository.save(bazarAttendance);
    }
    return { message: "Bazar attendance processed successfully" };
  }
}
