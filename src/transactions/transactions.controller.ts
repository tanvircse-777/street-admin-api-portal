import { Body, Controller, Post, Delete, Param } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionsDto } from "./transactions.dto";

@Controller("transaction")
export class TransactionsController {
  constructor(private _transactionsService: TransactionsService) {}

  @Post("create")
  async createTransaction(@Body() payload: CreateTransactionsDto) {
    return this._transactionsService.createTransaction(payload);
  }

  // @Delete("delete")
  // async deleteTransaction(@Body() transactionId: number) {
  //   return this._transactionsService.deleteTransaction(transactionId);
  // }

  @Delete("delete/:transactionId")
  async deleteTransaction(@Param("transactionId") transactionId: number) {
    return this._transactionsService.deleteTransaction(transactionId);
  }
}
