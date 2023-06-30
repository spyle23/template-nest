import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ResponseForm } from './types/response';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      success: true,
      message: 'file uploaded',
      data: null,
    } as ResponseForm<null>;
  }

  @Get()
  async test() {
    return 'mandeha';
  }
}
