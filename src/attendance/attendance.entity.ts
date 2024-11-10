// attendances/attendance.entity.ts
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonStatus } from "src/shared/shared.model";

@Entity()
export class Attendance extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  tanvirInTime: string;

  @Column()
  tanvirOutTime: string;

  @Column()
  shakilInTime: string;

  @Column()
  shakilOutTime: string;

  @Column()
  tarikInTime: string;

  @Column()
  tarikOutTime: string;

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
