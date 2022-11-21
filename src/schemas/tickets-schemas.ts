import Joi from "joi";

export const ticketSchema = Joi.object({
  ticketTypeId: Joi.number().integer().required()
});
