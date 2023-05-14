import { BullModule, getQueueToken } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';

import { EmailQueue } from '../constants';
import { EmailController } from '../controllers';

describe('EmailController', () => {
  let controller: EmailController;
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
      controllers: [EmailController],
      providers: [
        // {
        //   provide: EMAIL_CONFIG,
        //   useValue: options,
        // },
        // ActivationProcessor,
        // ResetProcessor,
        // EmailService,
      ],
    })
      .overrideProvider(getQueueToken(EmailQueue.Activation.valueOf()))
      .useValue(exampleQueueMock)
      .compile();

    controller = moduleRef.get<EmailController>(EmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
