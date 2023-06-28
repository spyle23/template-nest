import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { CommandModule } from './command/command.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [CommandModule, ProductModule, CategoryModule],
  controllers: [ApiController],
})
export class ApiModule {}
