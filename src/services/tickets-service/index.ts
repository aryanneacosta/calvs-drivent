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
  if (!idTicket) throw notFoundError();

  const ticketType = await ticketRepository.findFirstTicketType(idTicket.ticketTypeId);
  return ({ ...idTicket, TicketType: ticketType });
}

async function creatingTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findFirstByUserId(userId);

  const createdTicket = await ticketRepository.createTicket(enrollment.id, ticketTypeId);
  if (!createdTicket) throw notFoundError();

  const createdTicketType = await ticketRepository.findFirstTicketType(createdTicket.ticketTypeId);

  return ({ ...createdTicket, TicketType: createdTicketType });
}

const ticketService = {
  findTicketsTypes,
  findTicketsById,
  creatingTicket
};

export default ticketService;
