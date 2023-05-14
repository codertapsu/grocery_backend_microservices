import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';

import { registerConfig } from '@configuration';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceName } from './constants';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   load: registerConfig(),
    // }),
    ClientsModule.register([
      {
        name: ServiceName.Product.valueOf(),
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3002,
        },
      },
      {
        name: ServiceName.Order.valueOf(),
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'order',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'order-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: ServiceName.User.valueOf(),
      // inject: [ConfigService],
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            servers: [`nats://0.0.0.0:4222`],
          },
        });
      },
    },
    {
      provide: ServiceName.Payment.valueOf(),
      useFactory: () => {
        const host = 'redis-14374.c295.ap-southeast-1-1.ec2.cloud.redislabs.com';
        const port = 14374;
        const password = 'rlGNhatSr4yg1rfpDrAwRvYMnQW7yh9g';

        return ClientProxyFactory.create({
          transport: Transport.REDIS,
          options: {
            host,
            port,
            password,
          },
        });
      },
    },
    AppService,
  ],
})
export class AppModule {}
