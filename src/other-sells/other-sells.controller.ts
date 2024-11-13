import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
} from "@nestjs/common";
import { OtherSells } from "./other-sells.entity";
import { OtherSellsService } from "./other-sells.service";
import { CreateOrUpdateOtherSellsDto } from "./other-sells.dto";

@Controller("other-sells")
export class OtherSellsController {
  constructor(private _otherSellsService: OtherSellsService) {}

  @Get("by-month/:month")
  getOtherSellsByDateRange(
    @Param("month") month: string
  ): Promise<OtherSells[]> {
    return this._otherSellsService.getOtherSellssByMonth(month);
  }
}
