import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, NatsOptions, Transport } from '@nestjs/microservices';

import { UserModule } from './user.module';

async function bootstrap() {
  const microserviceOptions: NatsOptions = {
    transport: Transport.NATS,
    options: {
      servers: [`nats://0.0.0.0:4222`],
    },
  };

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, microserviceOptions);
  await app.listen();
}

bootstrap()
  .then(() => {
    console.log(`User service is running on nats://0.0.0.0:4222`);
  })
  .catch((error) => {
    console.log(error);
  });
