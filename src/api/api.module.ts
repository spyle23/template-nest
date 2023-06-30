import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ApiController } from './api.controller';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from 'src/logger/logger.middleware';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [AuthModule, TicketsModule],
  controllers: [ApiController],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes();
  }
}
