import { postingPayment } from "@/controllers";
import { authenticateToken, validateBody, validateQuery } from "@/middlewares";
import { paymentSchema } from "@/schemas/payment-schema";
import { Router } from "express";

const paymentRouter = Router();

paymentRouter
  .all("/*", authenticateToken)
  .post("/process", validateBody(paymentSchema), postingPayment);

export { paymentRouter };
