// accountss/accounts.entity.ts
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonStatus } from "src/shared/shared.model";
import { AccountType } from "./accounts.dto";

@Entity()
export class Accounts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  amount: number;

  @Column({
    type: "enum",
    enum: AccountType,
  })
  accountType: string;

  @Column()
  year: string;

  @Column({
    type: "enum",
    enum: CommonStatus,
    default: CommonStatus.ACTIVE,
  })
  status: CommonStatus;

  constructor(accounts?: Partial<Accounts>) {
    super();
    if (accounts) {
      Object.assign(this, accounts);
    }
  }
}
