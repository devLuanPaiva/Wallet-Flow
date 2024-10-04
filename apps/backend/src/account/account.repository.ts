import { Injectable } from '@nestjs/common';
import { AccountI, RepositoryAccount, TransactionsI } from '@wallet/core';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class AccountRepository implements RepositoryAccount {
  constructor(private readonly prismaService: PrismaService) {}
  async checkBalance(id: number): Promise<number> {
    const account = await this.prismaService.account.findUnique({
      where: { id: Number(id) },
      select: {
        bankBalance: true,
      },
    });

    return account ? account.bankBalance : null;
  }

  async createAccount(account: AccountI): Promise<void> {
    await this.prismaService.account.create({
      data: {
        user: { connect: { id: account.user.id } },
        transferKey: BigInt(account.transferKey),
        bankBalance: account.bankBalance,
      },
    });
  }

  async deposity(value: number, id: number): Promise<void> {
    try {
      await this.prismaService.account.update({
        where: { id: Number(id) },
        data: {
          bankBalance: { increment: value },
        },
      });
      await this.prismaService.transactionLog.create({
        data: {
          type: 'DEPOSIT',
          value: value,
          accountId: Number(id),
        },
      });
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
  }
  async searchAccount(userId: number): Promise<AccountI | null> {
    const account = await this.prismaService.account.findFirst({
      where: { userId: Number(userId) },
      include: { user: true },
    });

    return account
      ? { ...account, transferKey: account.transferKey.toString() }
      : null;
  }
  async searchAccountKey(transferKey: bigint): Promise<AccountI | null> {
    const account = await this.prismaService.account.findFirst({
      where: { transferKey: BigInt(transferKey) },
      include: { user: true },
    });

    return account
      ? { ...account, transferKey: account.transferKey.toString() }
      : null;
  }

  async transfer(
    value: number,
    id: number,
    transferKey: bigint,
  ): Promise<void> {
    try {
      await this.prismaService.account.update({
        where: { id: Number(id) },
        data: {
          bankBalance: { decrement: value },
        },
      });

      await this.prismaService.account.update({
        where: { transferKey: BigInt(transferKey) },
        data: {
          bankBalance: { increment: value },
        },
      });
      await this.prismaService.transactionLog.create({
        data: {
          type: 'TRANSFER',
          value: value,
          accountId: Number(id),
          recipientAccountKey: BigInt(transferKey),
        },
      });
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
  }

  async getAccountTransactions(
    account: Partial<AccountI>,
  ): Promise<TransactionsI[]> {
    try {
      const transactions = await this.prismaService.transactionLog.findMany({
        where: {
          OR: [
            { accountId: Number(account.id) },
            { recipientAccountKey: BigInt(account.transferKey) },
          ],
        },
        include: {
          account: true,
          recipientAccount: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return transactions.map((transaction: TransactionsI) => ({
        ...transaction,
        account: {
          ...transaction.account,
          transferKey: transaction.account.transferKey.toString(),
        },
        recipientAccount: transaction.recipientAccount
          ? {
              ...transaction.recipientAccount,
              transferKey: transaction.recipientAccount.transferKey.toString(),
            }
          : undefined,
      }));
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw new Error('Erro ao buscar transações da conta.');
    }
  }
  async reverse(transactionId: number, reversed: boolean): Promise<void> {
    const transaction = await this.prismaService.transactionLog.findUnique({
      where: { id: transactionId },
    });

    if (!transaction) {
      throw new Error('Transação não encontrada.');
    }

    if (transaction.type === 'DEPOSIT') {
      await this.prismaService.account.update({
        where: { id: transaction.accountId },
        data: {
          bankBalance: { decrement: transaction.value },
        },
      });
    } else if (transaction.type === 'TRANSFER') {
      await this.prismaService.account.update({
        where: { id: transaction.accountId },
        data: {
          bankBalance: { increment: transaction.value },
        },
      });

      if (transaction.recipientAccountKey) {
        await this.prismaService.account.update({
          where: { transferKey: BigInt(transaction.recipientAccountKey) },
          data: {
            bankBalance: { decrement: transaction.value },
          },
        });
      }
    } else {
      throw new Error('Tipo de transação inválido.');
    }

    await this.prismaService.transactionLog.update({
      where: { id: Number(transactionId) },
      data: {
        reversed: Boolean(reversed),
      },
    });
  }
}
