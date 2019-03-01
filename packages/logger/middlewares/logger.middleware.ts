import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import { Consuming, ContextTrace } from '../lib';
import { LoggerService } from '../services';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	constructor(private readonly logger: LoggerService) {}

	resolve(...args: any[]): MiddlewareFunction {
		return (req, res, next) => {
			const consuming = new Consuming();
			const contextTrace = new ContextTrace(`${req.protocol} ${req.httpVersion}`.toUpperCase());

			const logFormat = `${req.method} ${req.originalUrl} ${req.ip}`;

			next();

			if (res.statusCode >= 500) {
				this.logger.error(logFormat, contextTrace, consuming);
			} else if (res.statusCode >= 400) {
				this.logger.warn(logFormat, contextTrace, consuming);
			} else {
				this.logger.log(logFormat, contextTrace, consuming);
			}
		};
	}
}
