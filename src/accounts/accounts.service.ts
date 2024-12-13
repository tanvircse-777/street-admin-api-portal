import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Equal, Repository } from "typeorm";
import { Accounts } from "./accounts.entity";
import { CommonStatus } from "src/shared/shared.model";
import { AccountType } from "./accounts.dto";

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private readonly accountsRepository: Repository<Accounts>
  ) {}

  async getAccounts(): Promise<Accounts[]> {
    return this.accountsRepository.find({
      where: {
        status: Equal(CommonStatus.ACTIVE),
      },

      order: {
        amount: "DESC",
      },
    });
  }

  async getAccountsByUser(userName: string): Promise<Accounts> {
    return this.accountsRepository.findOne({
      where: {
        status: Equal(CommonStatus.ACTIVE),
        userName: Equal(userName),
        accountType: Equal(AccountType.INDIVIDUAL),
      },

      order: {
        amount: "DESC",
      },
    });
  }
}
