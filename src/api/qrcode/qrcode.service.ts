import { Injectable } from '@nestjs/common';
import { Prisma, QrCode } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QrcodeService {
    constructor(private prisma: PrismaService) { }

    async createQr(data: Prisma.QrCodeCreateInput): Promise<QrCode> {
        return await this.prisma.qrCode.create({
            data
        })
    }
}
