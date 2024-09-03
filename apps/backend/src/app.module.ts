import { Module } from '@nestjs/common';
import { PrismaModule } from './db/prima.module';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [PrismaModule, UserModule, AccountModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
