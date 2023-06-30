import { Controller, Get } from '@nestjs/common';
import { BusService } from './bus.service';
import { ResponseForm } from 'src/types/response';
import { Bus } from '@prisma/client';

@Controller('api/bus')
export class BusController {
    constructor(private readonly busService: BusService) {}

    @Get()
    async getAllBus(): Promise<ResponseForm<Bus[]>> {
        const bus = await this.busService.getBus();
        const response:ResponseForm<Bus[]> = {
            success: true,
            message: 'list bus',
            data: bus
        }
        return response;
    }
}
