import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export type CustomRequest = Request & { user: { email: string; isAdmin: boolean; password: string } }

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const {
        headers: { authorization },
      } = req;
      const token = authorization?.split(' ')[1];
      console.log(authorization)
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
