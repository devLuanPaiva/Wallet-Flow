import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { BcryptProvider } from './bcrypt.provider';
import { PrismaService } from '../db/prisma.service';
import { UserI } from '@wallet/core';

describe('UserController', () => {
  let userController: UserController;
  let bcryptProvider: BcryptProvider;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserRepository, BcryptProvider, PrismaService],
    }).compile();

    userController = module.get<UserController>(UserController);
    bcryptProvider = module.get<BcryptProvider>(BcryptProvider);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should register a user successfully', async () => {
    const user: UserI = {
      name: 'Jane Doe',
      email: 'jane@teste.com',
      password: 'Senha123#',
    };

    const hashedPassword = await bcryptProvider.cryptography(user.password);
    jest
      .spyOn(bcryptProvider, 'cryptography')
      .mockResolvedValue(hashedPassword);

    const createUserSpy = jest
      .spyOn(prismaService.user, 'upsert')
      .mockResolvedValue(user as any);

    await userController.register(user);

    expect(bcryptProvider.cryptography).toHaveBeenCalledWith(user.password);
    expect(createUserSpy).toHaveBeenCalledWith({
      where: { id: user.id ?? -1 },
      update: { ...user, password: hashedPassword },
      create: { ...user, password: hashedPassword },
    });
  });
});
