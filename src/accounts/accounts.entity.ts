import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CommonStatus } from "src/shared/shared.model";
import { AccountType } from "./accounts.dto";
import { Transactions } from "src/transactions/transactions.entity";

@Entity()
export class Accounts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  amount: number;

  @Column()
  accountName: string;

  @Column()
  year: string;

  @Column({
    type: "enum",
    enum: AccountType,
  })
  accountType: string;

  @Column({
    type: "enum",
    enum: CommonStatus,
    default: CommonStatus.ACTIVE,
  })
  status: CommonStatus;

  // Define the inverse relation
  @OneToMany(() => Transactions, (transaction) => transaction.account)
  transactions: Transactions[];

  constructor(accounts?: Partial<Accounts>) {
    super();
    if (accounts) {
      Object.assign(this, accounts);
    }
  }
}
