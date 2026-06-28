import { journalsCreateSchema, journalsListSchema, journalsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => journalsCreateSchema.safeParse(input),
  update: (input: unknown) => journalsUpdateSchema.safeParse(input),
  list: (input: unknown) => journalsListSchema.safeParse(input),
};
