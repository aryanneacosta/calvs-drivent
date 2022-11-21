import { notFoundError, unauthorizedError } from "@/errors";
import { PaymentData } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentRepository, { NewPayment } from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/tickets-repository";
import { Ticket } from "@prisma/client";

async function postPayment(userId: number, paymentData: PaymentData) {
  const ticket = await verifyTicket(paymentData.tickedId);

  await verifyUser(userId, ticket);

  const ticketType = await ticketRepository.findFirstTicketType(ticket.ticketTypeId);

  const newPayment: NewPayment = {
    ticketId: paymentData.tickedId,
    value: ticketType.price,
    cardIssuer: paymentData.cardData.issuer,
    cardLastDigits: paymentData.cardData.number.toString().slice(-4),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const payment = await paymentRepository.createPayment(newPayment);

  if(!payment) return;

  await ticketRepository.updateTicket(ticket.id);

  return payment;
}

async function verifyTicket(ticketId: number) {
  const ticket = await ticketRepository.findFirstTicket(ticketId);

  if(!ticketId) throw notFoundError();

  return ticket;
}

async function verifyUser(userId: number, ticket: Ticket) {
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);

  if(ticket.enrollmentId !== enrollment.id) {
    throw unauthorizedError();
  }
}

const paymentService = {
  postPayment,

};

export default paymentService;
