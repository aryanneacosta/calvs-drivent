import { prisma } from "@/config";
import { Ticket, TicketStatus } from "@prisma/client";

async function findManyTicketsTypes() {
  return prisma.ticketType.findMany();
}

async function findFirstTicketType(id: number) {
  return prisma.ticketType.findFirst({
    where: {
      id
    }
  });
}

async function findFirstTicket(id: number) {
  return prisma.ticket.findFirst({
    where: {
      id
    }
  });
}

async function createTicket(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {
      "ticketTypeId": ticketTypeId,
      "enrollmentId": enrollmentId,
      "status": TicketStatus.RESERVED
    }
  });
}

const ticketRepository = {
  findManyTicketsTypes,
  findFirstTicketType,
  findFirstTicket,
  createTicket
};

export default ticketRepository;
