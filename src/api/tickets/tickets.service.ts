import { Injectable } from '@nestjs/common';
import { Prisma, Ticket } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { InfoQR, QRENUM, generateQRCode } from 'src/qrcode';
import { QrCodeArg, TicketArg } from 'src/types/ticket';

@Injectable()
export class TicketsService {
  constructor(private prismaService: PrismaService) { }

  async createTicket(data: TicketArg & QrCodeArg & { busid?: number, useremail: string }): Promise<Ticket | null> {
    
    const key = data.useremail+ Date.now()
    const info: InfoQR = {
      qrType: data.ticketType as QRENUM,
      useremail: data.useremail,
      busid: data.busid,
      key,
    }
    const { url } = await generateQRCode(info)

    if (!url) return null


    const newQrCode = await this.prismaService.qrCode.create({
      data: {
        qrPath: url,
        startDate: data.startDate,
        endDate: data.endDate,
        key,
      }
    })
    const newTicket = this.prismaService.ticket.create({ data: { name: data.name, ticketType: data.ticketType, price: data.price, description: data.description, isReservate: data.isReservate, isAvalable: true, qrCode: { connect: { id: newQrCode.id } } } });
    return newTicket;
  }

  async checkQr() {

  }
}
