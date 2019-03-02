import { resolve } from 'path';
import { Injectable } from '@nestjs/common';
import { ILoggerModuleOptions } from '../logger';
import { LoggerLevel } from '../logger/enums';

@Injectable()
export class ConfigService {
    public getLoggerOptions(): ILoggerModuleOptions {
        return {
            level: LoggerLevel.ALL,
            layout: 'Nest',
            filePath: resolve(__dirname, '../../../../runtime/logs/app'),
            alwaysIncludePattern: true,
            pattern: '-yyyy-MM-dd.log',
            appenders: ['console', 'file']
        };
    }
}
