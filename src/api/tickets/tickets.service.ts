import { Injectable } from '@nestjs/common';
import { Prisma, QrCode, Ticket } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { InfoQR, QRENUM, generateQRCode } from 'src/qrcode';
import { QrCodeArg, TicketArg } from 'src/types/ticket';

const isSuperior = (date1: Date, date2: Date): boolean => date1.getTime() > date2.getTime()

@Injectable()
export class TicketsService {
  constructor(private prismaService: PrismaService) { }

  async createTicket(data: TicketArg & QrCodeArg & { busid?: number, useremail: string }): Promise<Ticket | null> {

    const key = data.useremail + Date.now()
    const info: InfoQR = {
      qrType: data.ticketType as QRENUM,
      useremail: data.useremail,
      busid: data.busid,
      key,
    }
    const { url } = await generateQRCode(info)

    if (!url) return null

    const bus = data.busid ? await this.prismaService.bus.findUnique({ where: { id: data.busid } }) : null

    if(bus) {
      if(bus.nbPlace === bus.nbReservation) return null
      await this.prismaService.bus.update({
        where: {
          id: bus.id
        },
        data: {
          ...bus,
          nbReservation: bus.nbReservation + 1,  
        }
      })
    }

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

  async checkQr(data: InfoQR & { driverId: number }): Promise<QrCode | null> {
    if (data.busid) {
      const driver = await this.prismaService.user.findUnique({
        where: {
          id: data.driverId
        },
        include: {
          Bus: true
        }
      })
      console.log(driver)
      if(data.busid !== driver?.Bus?.id) return null
    }
    const currentQr = await this.prismaService.qrCode.findUnique({
      where: {
        key: data.key
      },
      include: {
        Ticket: true
      }
    });
    if(!currentQr) return null
    if(!currentQr.Ticket) return null
    if(data.qrType === QRENUM.UNIQUE) {
      const deletedTicket = await this.prismaService.ticket.delete({
        where: {
          id: currentQr.Ticket.id
        }
      })
      const deletedQr = await this.prismaService.qrCode.delete({
        where: {
          id: currentQr.id
        }
      })
      return deletedQr;
    }else {
      if(isSuperior(new Date(), currentQr.endDate)){
        const deletedQr = await this.prismaService.qrCode.delete({
          where: {
            id: currentQr.id
          }
        })
        return deletedQr;
      }
      return currentQr
    }
  }
}
