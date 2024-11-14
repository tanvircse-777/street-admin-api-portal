// bazarAttendances/bazarAttendance.entity.ts
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonStatus } from "src/shared/shared.model";

@Entity()
export class BazarAttendance extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  userId: string;

  @Column({
    type: "enum",
    enum: CommonStatus,
    default: CommonStatus.ACTIVE,
  })
  status: CommonStatus;

  constructor(bazarAttendance?: Partial<BazarAttendance>) {
    super();
    if (bazarAttendance) {
      Object.assign(this, bazarAttendance);
    }
  }
}
