import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, TcpContext } from '@nestjs/microservices';

import { EventName } from '../constants';
import { Product } from '../models';

@Controller()
export class ProductController {
  @EventPattern(EventName.CreateProduct.valueOf())
  public createProduct(@Payload() payload: Product, @Ctx() context: TcpContext): Product {
    return {
      name: 'Snack',
      description: 'Hot snack',
    };
  }

  @MessagePattern(EventName.GetProduct.valueOf())
  public getProduct(@Payload() payload: number, @Ctx() context: TcpContext): Product {
    return {
      name: 'Snack',
      description: 'Hot snack',
    };
  }
}
