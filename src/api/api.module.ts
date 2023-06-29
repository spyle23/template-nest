import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MulterModule } from "@nestjs/platform-express/multer"
import { ApiController } from './api.controller';
import { CommandModule } from './command/command.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from 'src/logger/logger.middleware';

@Module({
  imports: [CommandModule, ProductModule, CategoryModule, AuthModule, MulterModule.register({ dest: "uploads/"  })],
  controllers: [ApiController],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes();
  }
}
