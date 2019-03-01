import { Module, DynamicModule, Provider } from '@nestjs/common';
import { LOGGER_MODULE_OPTIONS } from './logger.constants';
import { ILoggerModuleOptions, ILoggerModuleAsyncOptions, ILoggerOptionsFactory } from './interfaces';
import { LoggerService } from './services';
import { LoggerMiddleware } from './middlewares';

@Module({
	providers: [
		{
			provide: LoggerService,
			useFactory: (options: ILoggerModuleOptions) => {
				return new LoggerService(options);
			},
			inject: [ LOGGER_MODULE_OPTIONS ]
		},
		LoggerMiddleware
	],
	exports: [ LoggerService, LoggerMiddleware ]
})
export class LoggerModule {
	static register(options: ILoggerModuleOptions): DynamicModule {
		return {
			module: LoggerModule,
			providers: [ { provide: LOGGER_MODULE_OPTIONS, useValue: options } ]
		};
	}

	static registerAsync(options: ILoggerModuleAsyncOptions): DynamicModule {
		return {
			module: LoggerModule,
			imports: options.imports,
			providers: [ ...this.createAsyncProviders(options), ...(options.extraProviders || []) ]
		};
	}

	private static createAsyncProviders(options: ILoggerModuleAsyncOptions): Provider[] {
		if (options.useExisting || options.useFactory) {
			return [ this.createAsyncOptionsProvider(options) ];
		}
		return [
			this.createAsyncOptionsProvider(options),
			{
				provide: options.useClass,
				useClass: options.useClass
			}
		];
	}

	private static createAsyncOptionsProvider(options: ILoggerModuleAsyncOptions): Provider {
		if (options.useFactory) {
			return {
				provide: LOGGER_MODULE_OPTIONS,
				useFactory: options.useFactory,
				inject: options.inject || []
			};
		}
		return {
			provide: LOGGER_MODULE_OPTIONS,
			useFactory: async (optionsFactory: ILoggerOptionsFactory) => optionsFactory.createLoggerOptions(),
			inject: [ options.useExisting || options.useClass ]
		};
	}
}
