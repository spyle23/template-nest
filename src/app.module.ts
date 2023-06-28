import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AppService } from './app.service';

@Module({
  imports: [ApiModule],
  providers: [AppService],
})
export class AppModule {}
