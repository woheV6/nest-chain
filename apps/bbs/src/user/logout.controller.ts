import { Controller, Get, Req, Res } from '@nestjs/common';
import { LoggerService } from '@x-liquid/common';

@Controller('logout')
export class LogoutController {
  constructor(private readonly logger: LoggerService) {}

  @Get()
  index(@Req() req, @Res() res) {
    req.logout();
    res.redirect('/');
  }

  @Get('callback')
  callback(@Req() req, @Res() res) {
    this.logger.log('user logout req:', req);
    this.logger.log('user logout res:', res);
  }
}
