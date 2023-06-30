import { Body, Controller, Post, Request as NestRequest } from '@nestjs/common';
import { Prisma, Ticket, TicketType } from '@prisma/client';
import { TicketsService } from './tickets.service';
import { ResponseForm } from 'src/types/response';
import { Request } from 'express';
import { CustomRequest } from 'src/logger/logger.middleware';
import { TicketArg } from 'src/types/ticket';

const checkType = (startDate: Date,param: TicketType): Date => {
  const result = new Date(startDate);
  if(param === TicketType.UNIQUE || param === TicketType.MOIS){
    result.setMonth(result.getMonth() + 1)
  }else if(param === TicketType.JOUR) {
    result.setDate(result.getDate() + 1)
  }else {
    result.setDate(result.getDate() + 7)
  }
  return result
}

@Controller('api/tickets')
export class TicketsController {
  constructor(private ticketService: TicketsService) { }

  @Post()
  async createTicket(@Body() body: TicketArg & { busid?: number }, @NestRequest() req: CustomRequest) {
    const endDate = checkType(new Date(), body.ticketType)
    const nestedData = { ...body, useremail: req.user.email, endDate }
    const data = await this.ticketService.createTicket(nestedData);

    const response: ResponseForm<Ticket | null> = {
      success: data ? true : false,
      message: data ? 'ticket created' : 'failed to create ticket',
      data,
    };
    return response;
  }
}
