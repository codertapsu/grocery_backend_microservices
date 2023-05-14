import { Module } from '@nestjs/common';

import { PaymentController } from './controllers';
import { PaymentService } from './services';

@Module({
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
