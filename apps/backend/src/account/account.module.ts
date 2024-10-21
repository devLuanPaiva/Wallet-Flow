import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PrismaModule } from '../db/prima.module';
import { UserModule } from '../user/user.module';
import { AccountController } from './account.controller';
import { AccountRepository } from './account.repository';
import { UserMidddleware } from 'src/user/user.middleware';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [AccountController],
  providers: [AccountRepository],
})
export class AccountModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMidddleware).forRoutes(AccountController);
  }
}
