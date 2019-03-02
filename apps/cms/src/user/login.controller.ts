import {
  Controller,
  Get,
  Res,
  UnauthorizedException,
  Req,
  Next,
} from '@nestjs/common';
import * as passport from 'passport';
import { LoggerService } from '@x-liquid/common';

@Controller('/login')
export class LoginController {
  constructor(private readonly logger: LoggerService) {}

  @Get('/')
  login(@Res() res) {
    return res.redirect('/');
  }

  @Get('/callback')
  callback(@Req() req, @Res() res, @Next() next) {
    return passport.authenticate('auth0', (err, user, info) => {
      if (err) {
        this.logger.fatal('Authentication failed:', err);
        throw new UnauthorizedException('Authentication failed', err);
      }
      if (!user) {
        return res.redirect('/login');
      }
      req.logIn(user, error => {
        if (error) {
          this.logger.fatal('Login failed:', error);
          throw new UnauthorizedException('Login failed', error);
        }
        const returnTo = req.session.returnTo;
        delete req.session.returnTo;
        res.redirect(returnTo || '/user');
      });
    })(req, res, next);
  }
}
