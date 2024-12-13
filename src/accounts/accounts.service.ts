import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Equal, Repository } from "typeorm";
import { Accounts } from "./accounts.entity";
import { CommonStatus } from "src/shared/shared.model";

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private readonly accountsRepository: Repository<Accounts>
  ) {}

  async getAccountsByYear(year: string): Promise<Accounts[]> {
    return this.accountsRepository.find({
      where: {
        status: Equal(CommonStatus.ACTIVE),
        year: Equal(year),
      },

      order: {
        year: "ASC",
        amount: "DESC",
      },
    });
  }
}
