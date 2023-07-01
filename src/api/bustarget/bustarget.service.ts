import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BustargetService {
    constructor(private prisma: PrismaService) {}

    async getBustTargets() {
        return await this.prisma.busTarget.findMany({ include: { bus: true, ticket: true, target: true } })
    }
}
