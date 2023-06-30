import { Module } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    providers: [QrcodeService, PrismaService]
})
export class QrcodeModule {}
