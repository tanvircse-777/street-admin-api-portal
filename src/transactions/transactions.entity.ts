import { Accounts } from "src/accounts/accounts.entity";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { TransationType } from "./transactions.dto";

@Entity()
export class Transactions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  transactionDate: Date;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: "enum",
    enum: TransationType,
  })
  transactionType: string;

  // Many transactions can belong to one account
  @ManyToOne(() => Accounts, (account) => account.transactions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "accountId" })
  account: Accounts;

  @Column()
  accountId: number; // This will act as the foreign key

  constructor(transactions?: Partial<Transactions>) {
    super();
    if (transactions) {
      Object.assign(this, transactions);
    }
  }
}
