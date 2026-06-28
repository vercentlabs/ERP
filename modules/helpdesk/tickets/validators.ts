import { ticketsCreateSchema, ticketsListSchema, ticketsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => ticketsCreateSchema.safeParse(input),
  update: (input: unknown) => ticketsUpdateSchema.safeParse(input),
  list: (input: unknown) => ticketsListSchema.safeParse(input),
};
