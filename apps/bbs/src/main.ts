import * as session from 'express-session';
import * as passport from 'passport';
import * as Auth0 from 'passport-auth0';
import { NestFactory } from '@nestjs/core';
import { LoggerService } from '@x-liquid/common';
import { AppModule } from './app.module';

async function bootstrap() {
	passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser((user, done) => {
		done(null, user);
	});

	const app = await NestFactory.create(AppModule, {
		logger: false
	});

	const logger = app.get(LoggerService);
	app.useLogger(logger);

	app.use(
		session({
			secret: process.env.SESSION_SECRET,
			cookie: {},
			resave: false,
			saveUninitialized: true
		})
	);

	passport.use(
		new Auth0(
			{
				domain: process.env.AUTH0_DOMAIN,
				clientID: process.env.AUTH0_CLIENT_ID,
				clientSecret: process.env.AUTH0_CLIENT_SECRET,
				callbackURL: process.env.AUTH0_CALLBACK_URL
			},
			(accessToken, refreshToken, extraParams, profile, done) => {
				return done(null, profile);
			}
		)
	);

	app.use(passport.initialize());
	app.use(passport.session());

	await app.listen(3000);
	logger.log('Server runing at: http://127.0.0.1:3000/');
}
bootstrap();
