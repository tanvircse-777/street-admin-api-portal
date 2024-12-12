import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, EntityManager, Repository } from "typeorm";
import { Transactions } from "./transactions.entity";
import { CreateTransactionsDto } from "./transactions.dto";
import { Accounts } from "src/accounts/accounts.entity";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private readonly transactionsRepository: Repository<Transactions>
  ) {}

  async getTransactionsForYear(year: string) {
    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

    return await this.transactionsRepository.find({
      where: {
        transactionDate: Between(startDate, endDate),
      },
      relations: ["account"], // Include the related 'account' entity
      select: {
        // Specify what fields to fetch
        id: true,
        amount: true,
        transactionDate: true,
        description: true,
        transactionType: true,
        account: {
          id: true, // Fetch only the 'id' field from the account
          accountName: true, // Fetch only the 'name' field from the account
        },
      },
      order: {
        transactionDate: "DESC", // Change to "ASC" or "DESC" according to need
      },
    });
  }

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

  async updateTransaction(
    transactionId: number,
    payload: CreateTransactionsDto
  ) {
    const transaction = await Transactions.findOne({
      where: { id: transactionId },
      relations: ["account"],
    });

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    const account = transaction.account;

    try {
      // Step 1: Reverse the impact of the old transaction
      if (transaction.transactionType === "deposit") {
        account.amount -= transaction.amount;
      } else if (transaction.transactionType === "withdraw") {
        account.amount += transaction.amount;
      }

      // Step 2: Update transaction details
      transaction.amount = payload.amount;
      transaction.transactionDate = payload.transactionDate;
      transaction.description = payload.description;
      transaction.transactionType = payload.transactionType;

      // Step 3: Adjust the account's balance for the updated transaction
      if (transaction.transactionType === "deposit") {
        account.amount += transaction.amount;
      } else if (transaction.transactionType === "withdraw") {
        account.amount -= transaction.amount;
      }

      // Step 4: Save both the transaction and the account
      await transaction.save();
      await account.save();

      return { message: "Transaction updated successfully" };
    } catch (error) {
      throw new Error("Transaction update failed");
    }
  }
}
