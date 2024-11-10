// otherCostss/otherCosts.entity.ts
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonStatus } from "src/shared/shared.model";

@Entity()
export class OtherCosts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  title: string;

  @Column()
  amount: number;

  @Column({
    type: "enum",
    enum: CommonStatus,
    default: CommonStatus.ACTIVE,
  })
  status: CommonStatus;

  constructor(otherCosts?: Partial<OtherCosts>) {
    super();
    if (otherCosts) {
      Object.assign(this, otherCosts);
    }
  }
}
