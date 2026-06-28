import { deductionsCreateSchema, deductionsListSchema, deductionsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => deductionsCreateSchema.safeParse(input),
  update: (input: unknown) => deductionsUpdateSchema.safeParse(input),
  list: (input: unknown) => deductionsListSchema.safeParse(input),
};
