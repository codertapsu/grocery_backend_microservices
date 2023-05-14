import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, RedisOptions, Transport } from '@nestjs/microservices';

import { PaymentModule } from './payment.module';

const host = 'redis-14374.c295.ap-southeast-1-1.ec2.cloud.redislabs.com';
const port = 14374;
const password = 'rlGNhatSr4yg1rfpDrAwRvYMnQW7yh9g';

async function bootstrap() {
  const microserviceOptions: RedisOptions = {
    transport: Transport.REDIS,
    options: {
      host,
      port,
      password,
      retryAttempts: 5,
      retryDelay: 10000,
    },
  };

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(PaymentModule, microserviceOptions);
  await app.listen();
}

bootstrap()
  .then(() => {
    console.log(`Payment service is running on redis`);
  })
  .catch((error) => {
    console.log(error);
  });
