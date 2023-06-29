import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
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
      });
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: 'unauthenticated', data: null });
    }
  }
}
