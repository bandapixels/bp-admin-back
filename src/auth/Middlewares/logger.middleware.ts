import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token: string = req.headers.authorization;

    if (!jwt.verify(token, process.env.SECRET_KEY)) return false;
    next();
  }
}
