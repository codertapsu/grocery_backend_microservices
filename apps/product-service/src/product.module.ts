import { Module } from '@nestjs/common';

import { ProductController } from './controllers';
import { ProductService } from './services';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
