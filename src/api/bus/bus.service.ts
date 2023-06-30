import { Injectable } from '@nestjs/common';
import { Bus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BusService {
    constructor(private prisma: PrismaService) {}

    async getBus(): Promise<Bus[]>{
        return await this.prisma.bus.findMany()
    }
}
