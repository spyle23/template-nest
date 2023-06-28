import { Global, Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Global()
@Module({
  imports: [ApiModule],
  providers: [AppService, PrismaService],
})
export class AppModule {}
