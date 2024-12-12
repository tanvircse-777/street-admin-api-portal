import {
  Body,
  Controller,
  Post,
  Delete,
  Param,
  Put,
  Get,
} from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionsDto } from "./transactions.dto";
import { Accounts } from "src/accounts/accounts.entity";
import { Transactions } from "./transactions.entity";

@Controller("transaction")
export class TransactionsController {
  constructor(private _transactionsService: TransactionsService) {}

  @Get("by-year/:year")
  getAccountsByYear(@Param("year") year: string): Promise<Transactions[]> {
    return this._transactionsService.getTransactionsForYear(year);
  }

  @Post("create")
  async createTransaction(@Body() payload: CreateTransactionsDto) {
    return this._transactionsService.createTransaction(payload);
  }

  @Delete("delete/:transactionId")
  async deleteTransaction(@Param("transactionId") transactionId: number) {
    return this._transactionsService.deleteTransaction(transactionId);
  }

  @Put("update/:transactionId")
  async updateTransaction(
    @Param("transactionId") transactionId: number,
    @Body() payload: CreateTransactionsDto
  ) {
    return this._transactionsService.updateTransaction(transactionId, payload);
  }
}
