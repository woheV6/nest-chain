import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { Provider } from '@nestjs/common';
import { LoggerLevel } from '../enums/logger-level.enum';

export interface ILoggerOptions {
	level: LoggerLevel;
}

export interface ILoggerOptionsFactory {
	createLoggerOptions(): Promise<ILoggerModuleOptions> | ILoggerModuleOptions;
}

export interface ILoggerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	useExisting?: Type<ILoggerOptionsFactory>;
	useClass?: Type<ILoggerOptionsFactory>;
	useFactory?: (...args: any[]) => Promise<ILoggerModuleOptions> | ILoggerModuleOptions;
	inject?: any[];
	extraProviders?: Provider[];
}

export interface ILoggerModuleOptions extends ILoggerOptions {
	[key: string]: any;
}
