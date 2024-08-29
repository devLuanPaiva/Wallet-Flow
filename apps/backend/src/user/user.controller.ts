import { Body, Controller, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { BcryptProvider } from 'src/auth/bcrypt.provider';
import { User, UserI } from '@wallet/core';
import * as jwt from 'jsonwebtoken';

@Controller('user')
export class UserController {
  constructor(
    private readonly repo: UserRepository,
    private readonly crypy: BcryptProvider,
  ) {}

  @Post('login')
  async login(
    @Body() data: { email: string; password: string },
  ): Promise<string> {
    const useCase = new User(this.repo, this.crypy);
    const user = await useCase.login(data.email, data.password);
    const secret = process.env.JWT_SECRET!;
    return jwt.sign(user, secret, { expiresIn: '15d' });
  }
  @Post('register')
  async register(@Body() user: UserI): Promise<void> {
    const useCase = new User(this.repo, this.crypy);
    await useCase.register(user);
  }
}
