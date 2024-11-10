import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, EntityManager, IsNull, Not, Repository } from "typeorm";
import { Attendance } from "./attendance.entity";
import { UpdateAttendanceDto } from "./attendance.dto";
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

}
