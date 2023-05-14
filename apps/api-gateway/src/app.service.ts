import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';

import { EventName, ServiceName } from './constants';
import { Kafka, Partitioners } from 'kafkajs';

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {
  public constructor(
    @Inject(ServiceName.User.valueOf()) private _userServiceClient: ClientProxy,
    @Inject(ServiceName.Product.valueOf()) private _productServiceClient: ClientProxy,
    @Inject(ServiceName.Payment.valueOf()) private _paymentServiceClient: ClientProxy,
    @Inject(ServiceName.Order.valueOf()) private _orderServiceClient: ClientKafka,
  ) {}
  public onModuleInit(): void {
    // const kafka = new Kafka({
    //   clientId: this.kafkaConfig.clientId,
    //   brokers: this.kafkaConfig.brokers,
    // });
    // kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });
    // this.producer = this.kafka.producer();
    // this.consumer = this.kafka.consumer({
    //   groupId: this.kafkaConfig.groupId + this.consumerSuffix,
    // });
    // this.fixedConsumer = this.kafka.consumer({
    //   groupId: this.kafkaConfig.groupId,
    // });
  }
  public onModuleDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  public async getUser(): Promise<string> {
    const result = await firstValueFrom(this._userServiceClient.send(EventName.GetUser.valueOf(), 1));
    console.log(result);

    return 'Get User';
  }

  public async getProduct(): Promise<string> {
    const result = await firstValueFrom(this._productServiceClient.emit(EventName.CreateProduct.valueOf(), 1));
    console.log(result);

    return 'Get Product';
  }

  public async charge(): Promise<string> {
    await firstValueFrom(this._paymentServiceClient.emit(EventName.Charge.valueOf(), 1));

    return 'Charge';
  }

  public async createOrder(): Promise<string> {
    await firstValueFrom(this._orderServiceClient.emit(EventName.CreateOrder.valueOf(), 'Hello Kafka'));

    return 'Created order';
  }
}
