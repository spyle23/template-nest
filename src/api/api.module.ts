import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { CommandModule } from './command/command.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [CommandModule, ProductModule],
  controllers: [ApiController],
})
export class ApiModule {}
