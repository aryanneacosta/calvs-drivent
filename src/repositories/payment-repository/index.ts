import { prisma } from "@/config";
import { Payment } from "@prisma/client";

async function createPayment(newPayment: NewPayment) {
  return prisma.payment.create({
    data: newPayment
  });
}

export type NewPayment = Omit<Payment, "id">;

const paymentRepository = {
  createPayment
};

export default paymentRepository;
