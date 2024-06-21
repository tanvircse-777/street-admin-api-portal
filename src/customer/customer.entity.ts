// customers/customer.entity.ts
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonStatus } from "src/shared/shared.model";

@Entity()
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  mobile_no: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  currentOffer: string;

  @Column({
    type: "enum",
    enum: CommonStatus,
    default: CommonStatus.ACTIVE,
  })
  status: CommonStatus;

  constructor(customer?: Partial<Customer>) {
    super();
    if (customer) {
      Object.assign(this, customer);
    }
  }
}
