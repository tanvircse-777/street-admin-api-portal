// attendances/attendance.entity.ts
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonStatus } from "src/shared/shared.model";

@Entity()
export class Attendance extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column({ default: "0" })
  tanvirInTime: string;

  @Column({ default: "0" })
  tanvirOutTime: string;

  @Column({ default: "0" })
  shakilInTime: string;

  @Column({ default: "0" })
  shakilOutTime: string;

  @Column({ default: "0" })
  tarikInTime: string;

  @Column({ default: "0" })
  tarikOutTime: string;

  @Column({ default: "0" })
  siamInTime: string;

  @Column({ default: "0" })
  siamOutTime: string;

  @Column({
    type: "enum",
    enum: CommonStatus,
    default: CommonStatus.ACTIVE,
  })
  status: CommonStatus;

  constructor(attendance?: Partial<Attendance>) {
    super();
    if (attendance) {
      Object.assign(this, attendance);
    }
  }
}
