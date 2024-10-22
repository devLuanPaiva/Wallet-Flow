import { Module } from '@nestjs/common';
import { PrismaModule } from './db/prima.module';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { AppController } from './app.controller';

@Module({
  imports: [PrismaModule, UserModule, AccountModule],
  controllers: [AppController],
})
export class AppModule {}
