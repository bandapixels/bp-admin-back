import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import { AuthConfig } from '../../config/models/auth.config';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly authConfig: AuthConfig) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token: string = req.headers.authorization;

    if (!jwt.verify(token, this.authConfig.sessionSecretKey)) {
      return false;
    }

    next();
  }
}
