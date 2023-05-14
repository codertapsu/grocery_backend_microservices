import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RedisContext } from '@nestjs/microservices';

import { EventName } from '../constants';
import { Payment } from '../models';

@Controller()
export class PaymentController {
  @EventPattern(EventName.Charge.valueOf())
  public charge(@Payload() payload: Payment, @Ctx() context: RedisContext): void {
    console.log(context);
  }
}
