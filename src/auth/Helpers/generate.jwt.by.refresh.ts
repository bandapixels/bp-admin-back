import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token: string = req.headers.authorization;

    if (!(await jwt.verify(token, process.env.SECRET_KEY)))
      res.status(403).json({ status: 'jwtToken not valid, user not exists' });
    next();
  }
}
