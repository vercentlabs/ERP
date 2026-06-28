import { paymentsCreateSchema, paymentsListSchema, paymentsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => paymentsCreateSchema.safeParse(input),
  update: (input: unknown) => paymentsUpdateSchema.safeParse(input),
  list: (input: unknown) => paymentsListSchema.safeParse(input),
};
