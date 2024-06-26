/**import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
*/
import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get('data')
  getData() {
    return { message: 'Hello from the backend!' };
  }
}
