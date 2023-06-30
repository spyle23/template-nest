import { TicketType } from "@prisma/client";

export type TicketArg = {
    name: string;
    description: string;
    price: number;
    isReservate: boolean;
    ticketType: TicketType
}

export type QrCodeArg = {
    startDate?: Date;
    endDate: Date;
}