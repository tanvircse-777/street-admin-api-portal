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
import { OtherSells } from "./other-sells.entity";
import {
  CreateOrUpdateOtherSellsDto,
  UpdateOtherSellsDto,
} from "./other-sells.dto";
import { CommonStatus } from "src/shared/shared.model";

@Injectable()
export class OtherSellsService {
  constructor(
    @InjectRepository(OtherSells)
    private readonly otherSellsRepository: Repository<OtherSells>
  ) {}

  async getOtherSellssByMonth(month: string): Promise<OtherSells[]> {
    console.log("month other sell");
    console.log(month);

    return this.otherSellsRepository.find({
      where: {
        date: Equal(month),
      },
      order: {
        date: "ASC",
      },
    });
  }
}
