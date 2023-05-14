import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, NatsContext, Payload } from '@nestjs/microservices';

import { EventName } from '../constants';
import { User } from '../models';

function delay(ms: number) {
  const start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

@Controller()
export class UserController {
  @MessagePattern(EventName.CreateUser.valueOf())
  public createUser(@Payload() payload: User, @Ctx() context: NatsContext): User {
    return {
      firstName: 'Come from microservice',
      lastName: 'hoang',
    };
  }

  @MessagePattern(EventName.GetUser.valueOf())
  public getUser(@Payload() payload: number, @Ctx() context: NatsContext): User {
    // delay(10000);
    console.log({ context });

    return {
      firstName: 'Come from microservice',
      lastName: 'hoang',
    };
  }
}
