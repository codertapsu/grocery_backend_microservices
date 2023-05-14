import { BullModule, getQueueToken } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';

import { Queue } from 'bull';
import { ActivationPayload } from 'src/models';

import { EMAIL_CONFIG, EmailQueue, ProcessName } from '../constants';
import { ActivationProcessor, ResetProcessor } from '../processors';
import { EmailService } from '../services';

describe('EmailService', () => {
  let service: EmailService;
  let moduleRef: TestingModule;

  const exampleQueueMock = { add: jest.fn() };

  beforeEach(async () => {
    jest.resetAllMocks();
    moduleRef = await Test.createTestingModule({
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
      // controllers: [EmailController],
      providers: [
        {
          provide: EMAIL_CONFIG,
          useValue: {
            host: 'smtp.gmail.com',
            port: 465,
            address: 'hoangduykhanh01@gmail.com',
            password: 'nykecmshqtvguppv',
          },
        },
        ActivationProcessor,
        ResetProcessor,
        EmailService,
      ],
    })
      .overrideProvider(getQueueToken(EmailQueue.Activation.valueOf()))
      .useValue(exampleQueueMock)
      .compile();

    service = moduleRef.get<EmailService>(EmailService);
  });

  it('should inject the queue', () => {
    const queue = moduleRef.get<Queue>(getQueueToken(EmailQueue.Activation.valueOf()));

    expect(queue).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should dispatch job', async () => {
    const payload: ActivationPayload = {
      email: 'test@test.com',
      url: 'http://link.com?token=ey',
    };
    await service.sendConfirmationEmail(payload);

    expect(exampleQueueMock.add).toHaveBeenCalledWith(ProcessName.Confirmation.valueOf(), payload);
  });
});
