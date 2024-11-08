// sellCosts/sellCost.entity.ts
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonStatus } from "src/shared/shared.model";

@Entity()
export class SellCost extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  sell: number;

  @Column()
  cost: number;

  @Column({
    type: "enum",
    enum: CommonStatus,
    default: CommonStatus.ACTIVE,
  })
  status: CommonStatus;

  constructor(sellCost?: Partial<SellCost>) {
    super();
    if (sellCost) {
      Object.assign(this, sellCost);
    }
  }
}
