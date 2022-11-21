import { getTicketsTypes, getTicketsById, postTicket } from "@/controllers/tickets-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { ticketSchema } from "@/schemas";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsTypes)
  .get("/", getTicketsById)
  .post("/", validateBody(ticketSchema), postTicket);

export { ticketsRouter };
