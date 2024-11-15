import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, EntityManager, IsNull, Not, Repository } from "typeorm";
import { Attendance } from "./attendance.entity";
import {
  CreateOrUpdateAttendanceDto,
  UpdateAttendanceDto,
} from "./attendance.dto";
import { CommonStatus } from "src/shared/shared.model";

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    private readonly entityManager: EntityManager
  ) {}

  async getAttendancesByDateRange(
    startDate: string,
    endDate: string
  ): Promise<Attendance[]> {
    return this.attendanceRepository.find({
      where: {
        date: Between(startDate, endDate),
      },
      order: {
        date: "ASC",
      },
    });
  }

  async createOrUpdateSellCosts(payload: CreateOrUpdateAttendanceDto) {
    for (const day of payload.daysData) {
      const {
        databaseDateFormat,
        tanvirInTime,
        tanvirOutTime,
        shakilInTime,
        shakilOutTime,
        tarikInTime,
        tarikOutTime,
        siamInTime,
        siamOutTime,
      } = day;

      // Check if a record with the specified date already exists
      let attendance = await this.attendanceRepository.findOne({
        where: { date: databaseDateFormat },
      });

      if (attendance) {
        // Update existing record
        attendance.tanvirInTime = tanvirInTime ?? attendance.tanvirInTime;
        attendance.tanvirOutTime = tanvirOutTime ?? attendance.tanvirOutTime;
        attendance.shakilInTime = shakilInTime ?? attendance.shakilInTime;
        attendance.shakilOutTime = shakilOutTime ?? attendance.shakilOutTime;
        attendance.tarikInTime = tarikInTime ?? attendance.tarikInTime;
        attendance.tarikOutTime = tarikOutTime ?? attendance.tarikOutTime;
        attendance.siamInTime = siamInTime ?? attendance.siamInTime;
        attendance.siamOutTime = siamOutTime ?? attendance.siamOutTime;
      } else {
        // Create new record
        attendance = this.attendanceRepository.create({
          date: databaseDateFormat,
          tanvirInTime: tanvirInTime ?? 0,
          tanvirOutTime: tanvirOutTime ?? 0,
          shakilInTime: shakilInTime ?? 0,
          shakilOutTime: shakilOutTime ?? 0,
          tarikInTime: tarikInTime ?? 0,
          tarikOutTime: tarikOutTime ?? 0,
          siamInTime: siamInTime ?? 0,
          siamOutTime: siamOutTime ?? 0,
          status: CommonStatus.ACTIVE,
        } as Attendance);
      }

      // Save the record (insert if new, update if exists)
      await this.attendanceRepository.save(attendance);
    }
    return { message: "Sell costs processed successfully" };
  }
}
