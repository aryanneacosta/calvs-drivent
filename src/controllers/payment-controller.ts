import { AuthenticatedRequest } from "@/middlewares";
import { PaymentData } from "@/protocols";
import paymentService from "@/services/payment-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function postingPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const paymentData = req.body as PaymentData;

  try {
    const payment = await paymentService.postPayment(userId, paymentData);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}
