import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import {
  LoggerModule,
  LoggerMiddleware,
  ConfigModule,
  ConfigService,
  LoggerService,
} from '@x-liquid/common';

@Module({
  imports: [
    LoggerModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          ...configService.getLoggerOptions(),
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
