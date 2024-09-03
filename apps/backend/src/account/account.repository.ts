import { Injectable } from '@nestjs/common';
import { AccountI, RepositoryAccount } from '@wallet/core';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class AccountRepository implements RepositoryAccount {
  constructor(private readonly prismaService: PrismaService) {}
  async chackBalance(id: number): Promise<number> {
    const account = await this.prismaService.account.findUnique({
      where: { id: Number(id) },
      select: {
        bankBalance: true,
      },
    });

    if (!account) {
      throw new Error('Conta não encontrada.');
    }

    return account.bankBalance;
  }

  async createAccount(account: AccountI): Promise<void> {
    try {
      await this.prismaService.account.create({
        data: {
          user: { connect: { id: account.user.id } },
          transferKey: BigInt(account.transferKey),
          bankBalance: account.bankBalance,
        },
      });
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  }

  async deposity(value: number, id: number): Promise<void> {
    try {
      await this.prismaService.account.update({
        where: { id: Number(id) },
        data: {
          bankBalance: { increment: value },
        },
      });
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
  }
  async searchAccount(userId: number): Promise<AccountI> {
    const result: any = await this.prismaService.account.findMany({
      where: { userId: Number(userId) },
      include: { user: true },
    });

    return result.map((account: AccountI) => ({
      ...account,
      transferKey: account.transferKey.toString(),
    }));
  }
  async searchAccountKey(transferKey: bigint): Promise<AccountI> {
    const account = await this.prismaService.account.findFirst({
      where: { transferKey: BigInt(transferKey) },
      include: { user: true },
    });

    if (!account) {
      throw new Error('Conta não encontrada.');
    }

    return {
      ...account,
      transferKey: account.transferKey.toString(),
    };
  }

  async transfer(
    value: number,
    id: number,
    transferKey: bigint,
  ): Promise<void> {
    if ((await this.chackBalance(id)) < value) {
      throw new Error('Saldo insuficiente.');
    }
    try {
      await this.prismaService.account.update({
        where: { id: Number(id) },
        data: {
          bankBalance: { decrement: value },
        },
      });
      const recipientAccount = await this.prismaService.account.findFirst({
        where: { transferKey: BigInt(transferKey) },
      });
      if (!recipientAccount) {
        throw new Error('Conta do destinatário não encontrada.');
      }

      await this.prismaService.account.update({
        where: { id: recipientAccount.id },
        data: {
          bankBalance: { increment: value },
        },
      });
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
  }
}
