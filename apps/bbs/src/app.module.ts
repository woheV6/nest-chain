import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';

import { LoggerModule, LoggerMiddleware, ConfigModule, ConfigService } from '@x-liquid/common';
import { AuthMiddleware } from './aspects/auth.middleware';

@Module({
	imports: [
		LoggerModule.registerAsync({
			imports: [ ConfigModule ],
			useFactory: (configService: ConfigService) => {
				return {
					...configService.getLoggerOptions()
				};
			},
			inject: [ ConfigService ]
		}),
		UserModule
	],
	controllers: [ AppController ]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(LoggerMiddleware, AuthMiddleware).forRoutes('/');
	}
}
