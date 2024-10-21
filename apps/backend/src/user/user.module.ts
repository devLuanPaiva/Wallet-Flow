import { Module } from '@nestjs/common';
import { PrismaModule } from '../db/prima.module';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { BcryptProvider } from './bcrypt.provider';
import { UserMiddleware } from './user.middleware';

@Module({
  imports: [PrismaModule],
  exports: [UserMiddleware, UserRepository],
  controllers: [UserController],
  providers: [UserMiddleware, UserRepository, BcryptProvider],
})
export class UserModule {}
