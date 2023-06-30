import { Body, Controller, Post } from '@nestjs/common';
import { Prisma, Ticket, TicketType } from '@prisma/client';
import { TicketsService } from './tickets.service';
import { ResponseForm } from 'src/types/response';

@Controller('api/tickets')
export class TicketsController {
  constructor(private ticketService: TicketsService) { }

  @Post()
  async createTicket(@Body() body: Prisma.TicketCreateInput) {
    const data = await this.ticketService.createTicket(body);

    const response: ResponseForm<Ticket> = {
      success: true,
      message: 'ticket created',
      data,
    };
    return response;
  }
}
