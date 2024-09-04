import { PrismaClient } from '@prisma/client';
import { UserI } from '@wallet/core';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
async function seed() {
  await prisma.user.deleteMany();

  const users: Partial<UserI>[] = [
    {
      name: 'John',
      email: 'john@teste.com',
      password: await bcrypt.hash('Senha123#', 10),
    },
  ];
  await prisma.user.createMany({ data: users as any });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
