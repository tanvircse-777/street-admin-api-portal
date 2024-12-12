import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  Between,
  EntityManager,
  Equal,
  IsNull,
  Not,
  Repository,
} from "typeorm";
import { Accounts } from "./accounts.entity";
import { UpdateAccountsDto } from "./accounts.dto";
import { CommonStatus } from "src/shared/shared.model";

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private readonly accountsRepository: Repository<Accounts>,
    private readonly entityManager: EntityManager
  ) {}

  async getAccountsByYear(year: string): Promise<Accounts[]> {
    return this.accountsRepository.find({
      where: {
        status: Equal(CommonStatus.ACTIVE),
        year: Equal(year),
      },

      order: {
        year: "ASC",
      },
    });
  }
}
