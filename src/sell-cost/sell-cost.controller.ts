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
import { SellCost } from "./sell-cost.entity";
import { SellCostService } from "./sell-cost.service";
import { SellCostDto, UpdateSellCostDto } from "./sell-cost.dto";

@Controller("sell-cost")
export class SellCostController {
  constructor(private _sellCostService: SellCostService) {}
  @Get()
  getAllSellCost(): Promise<SellCost[]> {
    return this._sellCostService.getAllSellCost();
  }

  @Get("/:id")
  getSellCostById(@Param("id") id: number): Promise<SellCost> {
    return this._sellCostService.getSellCostById(Number(id));
  }

  @Get("by-date-range/:startDate/:endDate")
  getSellCostByDateRange(
    @Param("startDate") startDate: string,
    @Param("endDate") endDate: string
  ): Promise<SellCost[]> {
    return this._sellCostService.getSellCostsByDateRange(startDate, endDate);
  }


  @Get("by-date-range-for-chart/:startDate/:endDate")
  getSellCostsByDateRangeForChart(
    @Param("startDate") startDate: string,
    @Param("endDate") endDate: string
  ): Promise<SellCost[]> {
    return this._sellCostService.getSellCostsByDateRangeForChart(startDate, endDate);
  }

  @Post("create-or-update")
  async createOrUpdateSellCosts(@Body() payload: SellCostDto) {
    return this._sellCostService.createOrUpdateSellCosts(payload);
  }

  @Delete("delete/:id")
  deleteSellCost(@Param("id") id: number) {
    return this._sellCostService.deleteSellCost(Number(id));
  }

  @Patch("update/:id")
  updateSellCost(
    @Param("id") id: number,
    @Body() requestBody: UpdateSellCostDto
  ) {
    return this._sellCostService.updateSellCost(Number(id), requestBody);
  }
}
