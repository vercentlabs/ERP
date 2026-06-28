import { customersCreateSchema, customersListSchema, customersUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => customersCreateSchema.safeParse(input),
  update: (input: unknown) => customersUpdateSchema.safeParse(input),
  list: (input: unknown) => customersListSchema.safeParse(input),
};
