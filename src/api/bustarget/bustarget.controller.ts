import { Controller, Get } from '@nestjs/common';
import { BustargetService } from './bustarget.service';

@Controller('bustarget')
export class BustargetController {
    constructor(private bustargetService: BustargetService) {}

    @Get()
    async bustargets(){
        const data = await this.bustargetService.getBustTargets()
        const response = {
            success: true,
            message: 'bustarget',
            data,
        }
        return response
    }
}
