import { BullModule } from '@nestjs/bull';
import { DynamicModule, Module } from '@nestjs/common';

import { EMAIL_CONFIG, EmailQueue } from './constants';
import { EmailController } from './controllers';
import { EmailConfig, EmailConfigAsync } from './models';
import { ActivationProcessor, ResetProcessor } from './processors';
import { EmailService } from './services';

@Module({})
export class EmailModule {
  static register(options: EmailConfig): DynamicModule {
    return {
      module: EmailModule,
      imports: [
        BullModule.registerQueue(
          {
            name: EmailQueue.Activation.valueOf(),
          },
          {
            name: EmailQueue.Reset.valueOf(),
          },
          {
            name: 'file-operation-queue',
          },
        ),
      ],
      providers: [
        {
          provide: EMAIL_CONFIG,
          useValue: options,
        },
        ActivationProcessor,
        ResetProcessor,
        EmailService,
      ],
      exports: [EmailService],
      controllers: [EmailController],
    };
  }

  static registerAsync(options: EmailConfigAsync): DynamicModule {
    return {
      module: EmailModule,
      imports: [
        ...(options.imports || []),
        BullModule.registerQueue(
          {
            name: EmailQueue.Activation.valueOf(),
          },
          {
            name: EmailQueue.Reset.valueOf(),
          },
          {
            name: 'file-operation-queue',
          },
        ),
      ],
      providers: [
        {
          provide: EMAIL_CONFIG,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        ActivationProcessor,
        ResetProcessor,
        EmailService,
      ],
      exports: [EmailService],
      controllers: [EmailController],
    };
  }
}
