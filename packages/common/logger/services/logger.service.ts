import * as _ from 'lodash';
import * as Path from 'path';
import * as Log4js from 'log4js';
import * as Util from 'util';
import * as Moment from 'moment';
import * as StackTrace from 'stacktrace-js';
import Chalk from 'chalk';
import { Injectable, LoggerService as ILoggerService } from '@nestjs/common';
import { ContextTrace, Consuming } from '../lib';
import { ILoggerModuleOptions } from '../interfaces';
import { LoggerLevel } from '../enums';

@Injectable()
export class LoggerService implements ILoggerService {
	private readonly instance: Log4js.Logger;

	constructor(private readonly options: ILoggerModuleOptions) {
		Log4js.addLayout(this.options.layout, (logConfig: any) => {
			return (logEvent: Log4js.LoggingEvent): string => {
				let moduleName: string = '';
				let position: string = '';
				let consuming: number = 0;
				const messageList: string[] = [];
				logEvent.data.forEach((value: any) => {
					if (value instanceof ContextTrace) {
						moduleName = value.context;
						if (value.lineNumber && value.columnNumber) {
							position = `${value.lineNumber}, ${value.columnNumber}`;
						}
						return;
					}
					if (value instanceof Consuming) {
						consuming = value.consuming;
						return;
					}
					if (typeof value !== 'string') {
						value = Util.inspect(value, false, 3, true);
					}

					messageList.push(value);
				});

				const messageOutput: string = messageList.join(' ');
				const positionOutput: string = position ? ` [${position}]` : '';
				const typeOutput: string = `[${logConfig.type}] ${logEvent.pid.toString()}   - `;
				const dateOutput: string = `${Moment(logEvent.startTime).format('YYYY-MM-DD HH:mm:ss')}`;
				const moduleOutput: string = moduleName ? `[${moduleName}] ` : '[LoggerService] ';
				let levelOutput: string = `[${logEvent.level}] ${messageOutput}`;
				let consumingOutput: string = `+${consuming}ms`;

				switch (logEvent.level.toString()) {
					case LoggerLevel.DEBUG:
						levelOutput = Chalk.green(levelOutput);
						break;
					case LoggerLevel.INFO:
						levelOutput = Chalk.cyan(levelOutput);
						break;
					case LoggerLevel.WARN:
						levelOutput = Chalk.yellow(levelOutput);
						break;
					case LoggerLevel.ERROR:
						levelOutput = Chalk.red(levelOutput);
						break;
					case LoggerLevel.FATAL:
						levelOutput = Chalk.hex('#DD4C35')(levelOutput);
						break;
					default:
						levelOutput = Chalk.grey(levelOutput);
						break;
				}

				return `${Chalk.green(typeOutput)}${dateOutput}    ${Chalk.yellow(
					moduleOutput
				)}${levelOutput}${positionOutput} ${Chalk.yellow(consumingOutput)}`;
			};
		});
		Log4js.configure({
			appenders: {
				console: {
					type: 'stdout',
					layout: { type: this.options.layout }
				},
				file: {
					type: 'dateFile',
					filename: this.options.filePath,
					layout: { type: this.options.layout },
					alwaysIncludePattern: this.options.alwaysIncludePattern,
					pattern: this.options.pattern
				},
				...this.options.appenderList
			},
			categories: {
				default: {
					appenders: this.options.appenders,
					level: this.options.level
				}
			}
		});
		this.instance = Log4js.getLogger();
		this.instance.level = this.options.level;
		this.log('LoggerService dependencies initialized');
	}

	public debug(message: any, ...args: any[]): void {
		this.instance.debug(message, this.getStackTrace(), ...args);
	}

	public log(message: any, ...args: any[]): void {
		this.instance.info(message, this.getStackTrace(), ...args);
	}

	public warn(message: any, ...args: any[]): void {
		this.instance.warn(message, this.getStackTrace(), ...args);
	}

	public error(message: any, ...args: any[]): void {
		this.instance.error(message, this.getStackTrace(), ...args);
	}

	public fatal(message: any, ...args: any[]): void {
		this.instance.fatal(message, this.getStackTrace(), ...args);
	}

	private getStackTrace(deep: number = 2): ContextTrace {
		const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
		const stackInfo: StackTrace.StackFrame = stackList[deep];

		const lineNumber: number = stackInfo.lineNumber;
		const columnNumber: number = stackInfo.columnNumber;
		const fileName: string = stackInfo.fileName;

		const extnameLength: number = Path.extname(fileName).length;
		let basename: string = Path.basename(fileName);
		basename = basename.substr(0, basename.length - extnameLength);
		const context: string = _.upperFirst(_.camelCase(basename));

		return new ContextTrace(context, fileName, lineNumber, columnNumber);
	}
}
