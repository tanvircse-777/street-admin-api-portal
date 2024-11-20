import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { OtherCosts } from "./other-costs.entity";
import { OtherCostsService } from "./other-costs.service";
import { OtherCostsDto } from "./other-costs.dto";

@Controller("other-costs")
export class OtherCostsController {
  constructor(private _otherCostsService: OtherCostsService) {}

  @Get("by-month/:month")
  getOtherCostssByMonth(@Param("month") month: string): Promise<OtherCosts[]> {
    return this._otherCostsService.getOtherCostsByMonth(month);
  }

  @Post("create-or-update")
  async createOrUpdateOtherCostss(@Body() payload: OtherCostsDto) {
    return this._otherCostsService.createOrUpdateOtherCosts(payload);
  }
}
