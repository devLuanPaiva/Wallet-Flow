import { Module } from '@nestjs/common';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { PrismaModule } from 'src/db/prima.module';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { BcryptProvider } from 'src/auth/bcrypt.provider';

@Module({
  imports: [PrismaModule],
  exports: [AuthMiddleware, UserRepository],
  controllers: [UserController],
  providers: [AuthMiddleware, UserRepository, BcryptProvider],
})
export class UserModule {}
