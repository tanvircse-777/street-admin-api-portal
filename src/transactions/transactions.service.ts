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

    if (!account) {
      throw new Error("Account not found");
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
      // Step 1: Save the transaction
      await transaction.save();

      // Step 2: Update the associated account's balance
      if (transaction.transactionType === "deposit") {
        account.amount += transaction.amount;
      } else if (transaction.transactionType === "withdraw") {
        account.amount -= transaction.amount;
      }

      await account.save();

      // Step 3: Update the main_balance account (if not the same account)
      const mainBalanceAccount = await Accounts.findOne({
        where: { accountType: "main_balance", year: account.year },
      });

      if (mainBalanceAccount && account.id !== mainBalanceAccount.id) {
        if (transaction.transactionType === "deposit") {
          mainBalanceAccount.amount += transaction.amount;
        } else if (transaction.transactionType === "withdraw") {
          mainBalanceAccount.amount -= transaction.amount;
        }
        await mainBalanceAccount.save();
      }

      return { message: "Transaction created successfully" };
    } catch (error) {
      throw new Error("Transaction creation failed");
    }
  }

  async deleteTransaction(transactionId: number) {
    const transaction = await Transactions.findOne({
      where: { id: transactionId },
      relations: ["account"], // Load the associated account
    });

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    const account = transaction.account;

    try {
      // Step 1: Adjust the associated account's balance to reverse the transaction's impact
      if (transaction.transactionType === "deposit") {
        account.amount -= transaction.amount;
      } else if (transaction.transactionType === "withdraw") {
        account.amount += transaction.amount;
      }

      await account.save();

      // Step 2: Adjust the main_balance account (if not the same account)
      const mainBalanceAccount = await Accounts.findOne({
        where: { accountType: "main_balance", year: account.year },
      });

      if (mainBalanceAccount && account.id !== mainBalanceAccount.id) {
        if (transaction.transactionType === "deposit") {
          mainBalanceAccount.amount -= transaction.amount;
        } else if (transaction.transactionType === "withdraw") {
          mainBalanceAccount.amount += transaction.amount;
        }
        await mainBalanceAccount.save();
      }

      // Step 3: Delete the transaction
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
      // Step 1: Reverse the impact of the old transaction on the associated account
      if (transaction.transactionType === "deposit") {
        account.amount -= transaction.amount;
      } else if (transaction.transactionType === "withdraw") {
        account.amount += transaction.amount;
      }

      // Step 2: Reverse the impact of the old transaction on `main_balance` account
      const mainBalanceAccount = await Accounts.findOne({
        where: { accountType: "main_balance", year: account.year },
      });

      // Ensure we're not syncing the `main_balance` with itself
      if (mainBalanceAccount && account.id !== mainBalanceAccount.id) {
        if (transaction.transactionType === "deposit") {
          mainBalanceAccount.amount -= transaction.amount;
        } else if (transaction.transactionType === "withdraw") {
          mainBalanceAccount.amount += transaction.amount;
        }
        await mainBalanceAccount.save();
      }

      // Step 3: Update the transaction details
      transaction.amount = payload.amount;
      transaction.transactionDate = payload.transactionDate;
      transaction.description = payload.description;
      transaction.transactionType = payload.transactionType;

      // Step 4: Apply the updated transaction impact to the associated account
      if (transaction.transactionType === "deposit") {
        account.amount += transaction.amount;
      } else if (transaction.transactionType === "withdraw") {
        account.amount -= transaction.amount;
      }

      await account.save();

      // Step 5: Apply the updated transaction impact to the `main_balance` account
      if (mainBalanceAccount && account.id !== mainBalanceAccount.id) {
        if (transaction.transactionType === "deposit") {
          mainBalanceAccount.amount += transaction.amount;
        } else if (transaction.transactionType === "withdraw") {
          mainBalanceAccount.amount -= transaction.amount;
        }
        await mainBalanceAccount.save();
      }

      // Step 6: Save the updated transaction
      await transaction.save();

      return { message: "Transaction updated successfully" };
    } catch (error) {
      throw new Error("Transaction update failed");
    }
  }
}
