import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  calculate( @Query('expression') expression: string) {
    return this.appService.calculate(expression);
  }
}
