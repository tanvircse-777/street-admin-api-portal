import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { Transactions } from "./transactions.entity";
import { CreateTransactionsDto } from "./transactions.dto";
import { Accounts } from "src/accounts/accounts.entity";

@Injectable()
export class TransactionsService {
  constructor() {}

  async createTransaction(payload: CreateTransactionsDto) {
    const account = await Accounts.findOne({
      where: { id: payload.accountId, year: payload.year },
    });

    console.log("transaction payload", payload);

    if (!account) {
      throw new Error("Account not found"); // Or use a proper exception (e.g., NotFoundException in NestJS)
    }

    const transaction = Transactions.create({
      amount: payload.amount,
      transactionDate: payload.transactionDate,
      description: payload.description,
      accountId: account.id,
      transactionType: payload.transactionType,
      account,
    });

    try {
      await transaction.save();

      // Update the account's amount based on transaction type
      if (transaction.transactionType === "deposit") {
        account.amount += transaction.amount;
      } else if (transaction.transactionType === "withdraw") {
        account.amount -= transaction.amount;
      }

      // Save the updated account to persist the changes
      try {
        await account.save();
      } catch (error) {
        throw new Error("account update failed");
      }
    } catch (error) {
      throw new Error("Transaction creation or account update failed");
    }

    return { message: "Transaction processed successfully" };
  }

  async deleteTransaction(transactionId: number) {
    // Find the transaction to be deleted
    const transaction = await Transactions.findOne({
      where: { id: transactionId },
      relations: ["account"], // Load the associated account
    });

    if (!transaction) {
      throw new Error("Transaction not found"); // Or use a proper exception (e.g., NotFoundException in NestJS)
    }

    const account = transaction.account;

    try {
      // Adjust the account's balance based on the transaction type
      if (transaction.transactionType === "deposit") {
        account.amount -= transaction.amount; // Revert deposit
      } else if (transaction.transactionType === "withdraw") {
        account.amount += transaction.amount; // Revert withdrawal
      }

      // Save the updated account to persist the changes
      await account.save();

      // Delete the transaction
      await Transactions.delete(transactionId);

      return { message: "Transaction deleted successfully" };
    } catch (error) {
      throw new Error("Transaction deletion failed");
    }
  }
}
