import { checkoutCreateSchema, checkoutListSchema, checkoutUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => checkoutCreateSchema.safeParse(input),
  update: (input: unknown) => checkoutUpdateSchema.safeParse(input),
  list: (input: unknown) => checkoutListSchema.safeParse(input),
};
