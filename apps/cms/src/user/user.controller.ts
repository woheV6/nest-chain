import { Controller, Req, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('/')
  index(@Req() req) {
    return req.user;
  }
}
