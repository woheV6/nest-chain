import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import * as passport from 'passport';
import { LoginController } from './login.controller';
import { LogoutController } from './logout.controller';
import { UserController } from './user.controller';

@Module({
  controllers: [LoginController, LogoutController, UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        passport.authenticate('auth0', {
          scope: 'openid email profile',
        }),
      )
      .exclude({ path: '/login/callback', method: RequestMethod.GET })
      .forRoutes(LoginController);
  }
}
