import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';

import { EventName } from '../constants';
import { Order } from '../models';

@Controller()
export class OrderController {
  @EventPattern(EventName.CreateOrder.valueOf())
  public createOrder(@Payload() payload: any, @Ctx() context: KafkaContext): void {
    console.log(payload);
    console.log('Kafka called');
  }
}
