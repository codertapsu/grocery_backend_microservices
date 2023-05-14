import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';

import { EmailModule } from './email.module';

const host = '127.0.0.1';
const port = 3001;

async function bootstrap() {
  const microserviceOptions: TcpOptions = {
    transport: Transport.TCP,
    options: {
      host,
      port,
      retryAttempts: 5,
      retryDelay: 10000,
    },
  };
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(EmailModule, microserviceOptions);
  await app.listen();
}

bootstrap()
  .then(() => {
    console.log(`Email service is running on : ${host}:${port}`);
  })
  .catch((error) => {
    console.log(error);
  });
