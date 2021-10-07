import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    let token: string = req.headers.authorization;

    async function tokenValidator(token) {
      try {
        await jwt.verify(token, process.env.SECRET_KEY);
        return true;
      } catch (error) {
        return false;
      }
    }

    if (!await tokenValidator(token))
      // res.status(403).json({status: 'jwtToken not valid, user not exists'});
      return false
    next();
  }
}
