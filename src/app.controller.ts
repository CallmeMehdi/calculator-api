import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  calculate( @Query('expression') expression: string) {
    if (!expression){
      return "Welcome! Write your expression above like so: url?expression=3+3\n \
    You can use different operators: + - * / and parenthese ( )\n \
    Enjoy!";
    }else
    return this.appService.calculate(expression);
  }
}
