import { Injectable } from '@nestjs/common';
import { Prisma, Ticket } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketsService {
  constructor(private prismaService: PrismaService) {}

  async createTicket(data: Prisma.TicketCreateInput): Promise<Ticket> {
    const newTicket = this.prismaService.ticket.create({ data });
    return newTicket;
  }

  // removeTicket() {

  // }
}
