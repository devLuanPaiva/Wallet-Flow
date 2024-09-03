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
import { AccountI, UserI } from '@wallet/core';
import { UserLogged } from '../user/user.decorator';

@Controller('account')
export class AccountController {
  constructor(private readonly repo: AccountRepository) {}

  @Get('chack/:id')
  chackBalance(@Param('id') id: number): Promise<number> {
    return this.repo.chackBalance(id);
  }
  @Post('register')
  createAccount(@Body() account: AccountI, @UserLogged() userLogged: UserI) {
    if (account.user.id !== userLogged.id) {
      console.log(
        `user account ${account.user.id} | user loggerd ${userLogged.id}`,
      );

      throw new HttpException('Usuário não autorizado.', 401);
    }
    return this.repo.createAccount(account);
  }

  @Put('deposity/:id')
  deposity(
    @Param('id') id: number,
    @Body('value') value: number,
    @UserLogged() userLogged: UserI,
  ): Promise<void> {
    if (!userLogged.id) {
      throw new HttpException('Usuário não autorizado', 401);
    }
    return this.repo.deposity(value, id);
  }

  @Get('search/:transferKey')
  searchAccountKey(
    @Param('transferKey') transferKey: bigint,
  ): Promise<AccountI> {
    return this.repo.searchAccountKey(transferKey);
  }
  @Get('searchAccount/user/:id')
  searchAccount(@Param('id') id: number): Promise<AccountI> {
    return this.repo.searchAccount(id);
  }

  @Put('transfer/:transferKey')
  transfer(
    @Param('transferKey') transferKey: bigint,
    @Body('value') value: number,
    @Body('id') id: number,
    @UserLogged() userLogged: UserI,
  ): Promise<void> {
    if (!userLogged.id) {
      throw new HttpException('Usuário não autorizado', 401);
    }
    return this.repo.transfer(value, id, transferKey);
  }
}
