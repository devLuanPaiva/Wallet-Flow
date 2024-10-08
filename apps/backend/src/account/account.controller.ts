import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { Account, AccountI, TransactionsI, UserI } from '@wallet/core';
import { UserLogged } from '../user/user.decorator';

@Controller('account')
export class AccountController {
  constructor(private readonly repo: AccountRepository) {}

  @Get('check/:id')
  async checkBalance(@Param('id') id: number): Promise<number> {
    const account = new Account(this.repo);
    try {
      return await account.checkBalance(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Post('register')
  async createAccount(
    @Body() accountData: AccountI,
    @UserLogged() userLogged: UserI,
  ) {
    if (accountData.user.id !== userLogged.id) {
      throw new HttpException('Usuário não autorizado.', 401);
    }

    const account = new Account(this.repo);
    try {
      return await account.createAccount(accountData);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Put('deposity/:id')
  async deposity(
    @Param('id') id: number,
    @Body('value') value: number,
    @UserLogged() userLogged: UserI,
  ): Promise<void> {
    if (!userLogged.id) {
      throw new HttpException('Usuário não autorizado', 401);
    }

    const account = new Account(this.repo);
    try {
      await account.deposity(value, id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get('search/:transferKey')
  async searchAccountKey(
    @Param('transferKey') transferKey: bigint,
  ): Promise<AccountI> {
    try {
      return await this.repo.searchAccountKey(transferKey);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get('searchAccount/user/:id')
  async searchAccount(@Param('id') id: number): Promise<AccountI> {
    const account = new Account(this.repo);
    try {
      return await account.searchAccount(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Put('transfer/:transferKey')
  async transfer(
    @Param('transferKey') transferKey: bigint,
    @Body('value') value: number,
    @Body('id') id: number,
    @UserLogged() userLogged: UserI,
  ): Promise<void> {
    if (!userLogged.id) {
      throw new HttpException('Usuário não autorizado', 401);
    }

    const account = new Account(this.repo);
    try {
      await account.transfer(value, id, transferKey);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get('getAccountTransactions/:accountId/:key')
  async getAccountTransactions(
    @Param('accountId') accountId: number,
    @Param('key') key: bigint,
  ): Promise<TransactionsI[]> {
    const ParseAccount = {
      id: accountId,
      transferKey: key,
    };

    const account = new Account(this.repo);
    try {
      return await account.getAccountTransactions(ParseAccount);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Put('reversalOperation')
  async reverseOperation(
    @Body('transactionId') transactionId: number,
    @Body('reversed') reversed: boolean,
  ): Promise<void> {
    const account = new Account(this.repo);
    try {
      await account.reverse(transactionId, reversed);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
