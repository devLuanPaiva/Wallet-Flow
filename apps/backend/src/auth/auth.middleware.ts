import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, NextFunction, Response } from 'express';
import { UserRepository } from 'src/user/user.repository';
import * as jwt from 'jsonwebtoken';
import { UserI } from '@wallet/core';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly repo: UserRepository) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (!token) {
      throw new HttpException('Token não fornecido!', 401);
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET) as UserI;
    const user = await this.repo.searchEmail(payload.email);

    if (!user) {
      throw new HttpException('Usuário não encontrado!', 401);
    }
    (req as any).user = user;
    next();
  }
}
