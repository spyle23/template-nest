import { Global, Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AppController } from './app.controller'
import { TicketsModule } from './api/tickets/tickets.module';

@Global()
@Module({
  imports: [ApiModule, TicketsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
