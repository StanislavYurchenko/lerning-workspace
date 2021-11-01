import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import dotenv = require('dotenv');
import passport = require('passport');
import { Strategy, ExtractJwt } from 'passport-jwt';

import { HTTP_CODE } from '../constants/constants';
import { AppService } from './app.service';



dotenv.config();
const { JWT_SECRET } = process.env;

const params = {
  secretOrKey: JWT_SECRET || 'test',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};



@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(private readonly appService: AppService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    passport.use(
      new Strategy(params, async (payload, done) => {
        try {
          const userId = payload._id;
          const { data: user } = await this.appService.findUserById(userId);

          if (!user) {
            const error = new Error();
            error.message = 'User not found';
            // error.code = HTTP_CODE.NOT_FOUND;
            throw error;
          }

          if (!user.token) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          done(error, false);
        }
      })
    );

    passport.authenticate('jwt', { session: false }, (err, user) => {
      const token = req.get('Authorization')?.split(' ')[1];
      if (!user || err || token !== user.token) {
        return res.status(HTTP_CODE.FORBIDDEN).json({
          status: 'error',
          code: HTTP_CODE.FORBIDDEN,
          data: 'Forbidden',
          message: 'Access is denied',
        });
      }

      const { _id: id, ...rest } = user;
      req.user = { id, ...rest };
      return next();
    })(req, res, next);
  }
}
