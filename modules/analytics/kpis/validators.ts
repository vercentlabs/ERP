import { kpisCreateSchema, kpisListSchema, kpisUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => kpisCreateSchema.safeParse(input),
  update: (input: unknown) => kpisUpdateSchema.safeParse(input),
  list: (input: unknown) => kpisListSchema.safeParse(input),
};
