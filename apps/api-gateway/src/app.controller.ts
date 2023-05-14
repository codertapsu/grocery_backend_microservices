import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  public constructor(private readonly appService: AppService) {}

  @Get('user')
  public getUser(): Promise<string> {
    return this.appService.getUser();
  }

  @Get('product')
  public getProduct(): Promise<string> {
    return this.appService.getProduct();
  }

  @Get('charge')
  public charge(): Promise<string> {
    return this.appService.charge();
  }

  @Get('order')
  public createOrder(): Promise<string> {
    return this.appService.createOrder();
  }
}
