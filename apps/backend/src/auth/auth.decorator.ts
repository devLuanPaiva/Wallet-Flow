import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Logged = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
