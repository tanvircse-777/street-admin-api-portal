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

  @Column({
    type: "enum",
    enum: ConfigFor,
    default: ConfigFor.BAZAR_BONUS_PER_DAY,
  })
  config_for: string;
  

  @Column()
  amount: number;

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
