import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Dotenv from 'dotenv';
import { PrismaService } from './prisma/prisma.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from "express"
import * as path from 'path';

Dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use("/upload", express.static(path.join(__dirname, "../uploads")));
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
}
bootstrap();