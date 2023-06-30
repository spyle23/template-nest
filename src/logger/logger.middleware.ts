import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export type CustomRequest = Request & { user: { email: string; userType: UserType; password: string, userId: number } }

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const {
        headers: { authorization },
      } = req;
      const token = authorization?.split(' ')[1];
      if (!token)
        return res
          .status(401)
          .json({ success: false, message: 'unauthenticated', data: null });
      const auth = verify(token, process.env.JWT_SECRET_KEY as string, {
        algorithms: ['HS256'],
      }) as any;
      req.user = auth;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: 'unauthenticated', data: null });
    }
  }
}
