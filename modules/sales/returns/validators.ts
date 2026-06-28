import { returnsCreateSchema, returnsListSchema, returnsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => returnsCreateSchema.safeParse(input),
  update: (input: unknown) => returnsUpdateSchema.safeParse(input),
  list: (input: unknown) => returnsListSchema.safeParse(input),
};
