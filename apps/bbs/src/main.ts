import { NestFactory } from '@nestjs/core';
import { LoggerService } from '@x-liquid/common';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: false
	});

	const logger = app.get(LoggerService);
	app.useLogger(logger);

	app.enableCors({
		origin: '*',
		optionsSuccessStatus: 200
	});

	app.setGlobalPrefix('api/v1');

	await app.listen(3000);
	logger.log('Server runing at: http://127.0.0.1:3000/');
}
bootstrap();
