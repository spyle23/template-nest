import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  public prisma: PrismaClient = new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL } },
  });
}
