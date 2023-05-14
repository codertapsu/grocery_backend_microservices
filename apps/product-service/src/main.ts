import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';

import { ProductModule } from './product.module';

const host = '127.0.0.1';
const port = 3002;

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

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ProductModule, microserviceOptions);
  await app.listen();
}

bootstrap()
  .then(() => {
    console.log(`Product service is running on : ${host}:${port}`);
  })
  .catch((error) => {
    console.log(error);
  });
