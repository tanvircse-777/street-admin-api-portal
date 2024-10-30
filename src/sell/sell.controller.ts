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
import { Sell } from "./sell.entity";
import { SellService } from "./sell.service";
import { CreateSellDto, UpdateSellDto } from "./sell.dto";

@Controller("sell")
export class SellController {
  constructor(private _sellService: SellService) {}
  @Get()
  getAllSell(): Promise<Sell[]> {
    return this._sellService.getAllSell();
  }

  @Get("/:id")
  getSellById(@Param("id") id: number): Promise<Sell> {
    return this._sellService.getSellById(Number(id));
  }

  @Get("by-date-range/:startDate/:endDate")
  getSellByDateRange(
    @Param("startDate") startDate: string,
    @Param("endDate") endDate: string
  ): Promise<Sell[]> {
    return this._sellService.getSellsByDateRange(startDate, endDate);
  }

  @Get("by-year/:year")
  getMonthlySalesByYear(@Param("year") year: string) {
    return this._sellService.getMonthlySalesByYear(year);
  }

  @Post()
  createSell(@Body() requestBody: CreateSellDto) {
    return this._sellService.createSell(requestBody);
  }

  @Delete("delete/:id")
  deleteSell(@Param("id") id: number) {
    return this._sellService.deleteSell(Number(id));
  }

  @Patch("update/:id")
  updateSell(@Param("id") id: number, @Body() requestBody: UpdateSellDto) {
    return this._sellService.updateSell(Number(id), requestBody);
  }
}
