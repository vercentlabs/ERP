import { invoicesCreateSchema, invoicesListSchema, invoicesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => invoicesCreateSchema.safeParse(input),
  update: (input: unknown) => invoicesUpdateSchema.safeParse(input),
  list: (input: unknown) => invoicesListSchema.safeParse(input),
};
