import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/tickets-repository";

async function findTicketsTypes() {
  const ticketsTypes = await ticketRepository.findManyTicketsTypes();
  return ticketsTypes;
}

async function findTicketsById(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  const idTicket = await ticketRepository.findFirstTicket(enrollment.id);
  if (idTicket === undefined) {
    throw notFoundError();
  }

  const ticketType = await ticketRepository.findFirstTicketType(idTicket.ticketTypeId);
  return { ...idTicket, TicketType: ticketType };
}

const ticketService = {
  findTicketsTypes,
  findTicketsById
};

export default ticketService;
