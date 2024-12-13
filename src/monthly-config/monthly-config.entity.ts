// monthlyConfigs/monthlyConfig.entity.ts
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonStatus } from "src/shared/shared.model";
import { ConfigFor } from "./monthly-config.dto";

@Entity()
export class MonthlyConfig extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  month: string;

  @Column()
  title: string;

  @Column({ default: 0 })
  bazarBonusPerDay: number;

  @Column({ default: 0 })
  timeBaseBonusPerHour: number;

  @Column({ default: 0 })
  charitablePercentage: number;

  @Column({ default: 0 })
  ramzanFund: number;

  @Column({
    default: false,
  })
  isAccountUpdated: boolean;

  @Column({
    type: "enum",
    enum: CommonStatus,
    default: CommonStatus.ACTIVE,
  })
  status: CommonStatus;

  constructor(monthlyConfig?: Partial<MonthlyConfig>) {
    super();
    if (monthlyConfig) {
      Object.assign(this, monthlyConfig);
    }
  }
}
