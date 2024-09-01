import { PrismaService } from '../db/prisma.service';
import { AccountController } from './account.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountRepository } from './account.repository';
import { AccountI, UserI } from '@wallet/core';

describe('AccountController', () => {
  let accountController: AccountController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [AccountRepository, PrismaService],
    }).compile();

    accountController = module.get<AccountController>(AccountController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should register account successfully', async () => {
    const account: AccountI = {
      user: {
        id: 3,
        email: 'joanadoe@gmail.com',
      },
      transferKey: 1234567809,
      bankBalance: 100,
    };
    const userLogged: UserI = {
      id: 3,
      email: 'joanadoe@gmail.com',
      name: 'joanadoe',
    };

    const createAccountSpy = jest
      .spyOn(prismaService.account, 'create')
      .mockResolvedValue(account as any);

    await accountController.createAccount(account, userLogged);

    expect(createAccountSpy).toHaveBeenCalledWith({
      data: {
        user: { connect: { id: account.user.id } },
        transferKey: account.transferKey,
        bankBalance: account.bankBalance,
      },
    });
  });
});
