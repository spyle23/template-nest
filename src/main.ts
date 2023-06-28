import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Dotenv from 'dotenv';
import { PrismaService } from './prisma/prisma.service';

Dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
}
bootstrap();
