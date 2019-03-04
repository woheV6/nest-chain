import { NestMiddleware, MiddlewareFunction, Injectable } from '@nestjs/common';
import * as jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	resolve(): MiddlewareFunction {
		return jwt({
			secret: expressJwtSecret({
				cache: true,
				rateLimit: true,
				jwksRequestsPerMinute: 5,
				jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
			}),
			audience: process.env.AUTH0_AUDIENCE,
			issuer: `https://${process.env.AUTH0_DOMAIN}/`,
			algorithm: 'RS256'
		});
	}
}
