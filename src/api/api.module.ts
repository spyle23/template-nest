import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ApiController } from './api.controller';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from 'src/logger/logger.middleware';
import { QrcodeModule } from './qrcode/qrcode.module';
import { BusModule } from './bus/bus.module';
import { TicketsModule } from './tickets/tickets.module';
import { TicketsController } from './tickets/tickets.controller';

@Module({
  imports: [AuthModule, QrcodeModule, BusModule, TicketsModule],
  controllers: [ApiController],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(TicketsController);
  }
}
