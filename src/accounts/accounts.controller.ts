import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
} from "@nestjs/common";
import { Accounts } from "./accounts.entity";
import { AccountsService } from "./accounts.service";

@Controller("accounts")
export class AccountsController {
  constructor(private _accountsService: AccountsService) {}

  @Get()
  getAccounts(): Promise<Accounts[]> {
    return this._accountsService.getAccounts();
  }

  @Get("by-user/:userName")
  getAccountsByUser(@Param("userName") userName: string): Promise<Accounts> {
    return this._accountsService.getAccountsByUser(userName);
  }
}
