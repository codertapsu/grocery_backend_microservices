import { Module } from '@nestjs/common';

import { UserController } from './controllers';
import { UserService } from './services';

@Module({
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
