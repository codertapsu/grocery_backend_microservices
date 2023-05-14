import { NestFactory } from '@nestjs/core';
import { KafkaOptions, MicroserviceOptions, Transport } from '@nestjs/microservices';

import { OrderModule } from './order.module';

async function bootstrap() {
  const microserviceOptions: KafkaOptions = {
    transport: Transport.KAFKA,
    options: {
      producerOnlyMode: true,
      client: {
        clientId: 'order', // order-server
        brokers: ['localhost:9092'],
        retry: {
          retries: 5,
          initialRetryTime: 30,
        },
      },
      consumer: {
        groupId: 'order-consumer', // order-consumer-server
        allowAutoTopicCreation: true,
      },
    },
  };

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(OrderModule, microserviceOptions);
  await app.listen();
}

bootstrap()
  .then(() => {
    console.log(`Order microservice uses **Kafka** as its Transport layer`);
  })
  .catch((error) => {
    console.log(error);
  });
