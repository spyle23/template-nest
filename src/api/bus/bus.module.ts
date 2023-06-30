import { Module } from '@nestjs/common';
import { BusController } from './bus.controller';
import { BusService } from './bus.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BusController],
  providers: [BusService, PrismaService]
})
export class BusModule {}
