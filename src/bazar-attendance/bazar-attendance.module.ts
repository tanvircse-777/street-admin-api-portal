import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BazarAttendance } from "./bazar-attendance.entity";
import { BazarAttendanceService } from "./bazar-attendance.service";
import { BazarAttendanceController } from "./bazar-attendance.controller";

@Module({
  imports: [TypeOrmModule.forFeature([BazarAttendance])],
  providers: [BazarAttendanceService],
  controllers: [BazarAttendanceController],
  exports: [BazarAttendanceService],
})
export class BazarAttendanceModule {}
