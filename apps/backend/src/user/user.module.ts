import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/db/prima.module';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { BcryptProvider } from './bcrypt.provider';
import { UserMidddleware } from './user.middleware';

@Module({
  imports: [PrismaModule],
  exports: [UserMidddleware, UserRepository],
  controllers: [UserController],
  providers: [UserMidddleware, UserRepository, BcryptProvider],
})
export class UserModule {}
