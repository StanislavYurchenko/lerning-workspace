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
          const id = payload._id;
          const { data } = await this.appService.findUserById(id);

          if (!data) {
            const error = new Error();
            error.message = 'User not found';
            // error.code = HTTP_CODE.NOT_FOUND;
            throw error;
          }

          if (!data.token) {
            return done(null, false);
          }

          return done(null, data);
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
      req.user = user;
      return next();
    })(req, res, next);
  }
}
