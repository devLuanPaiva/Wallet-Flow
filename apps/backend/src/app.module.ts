import { Module } from '@nestjs/common';
import { PrismaModule } from './db/prima.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
