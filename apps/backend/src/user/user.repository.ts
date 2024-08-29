import { Injectable } from '@nestjs/common';
import { RepositoryUser, UserI } from '@wallet/core';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UserRepository implements RepositoryUser {
  constructor(private readonly prismaService: PrismaService) {}
  async register(user: UserI): Promise<void> {
    await this.prismaService.user.upsert({
      where: { id: user.id ?? -1 },
      update: user as any,
      create: user as any,
    });
  }
  async searchEmail(email: string): Promise<UserI | null> {
    return await this.prismaService.user.findUnique({ where: { email } });
  }
}
