import { Module } from '@nestjs/common';
import { BustargetController } from './bustarget.controller';
import { BustargetService } from './bustarget.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BustargetController],
  providers: [BustargetService, PrismaService]
})
export class BustargetModule {}
