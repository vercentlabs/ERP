import { leadsCreateSchema, leadsListSchema, leadsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => leadsCreateSchema.safeParse(input),
  update: (input: unknown) => leadsUpdateSchema.safeParse(input),
  list: (input: unknown) => leadsListSchema.safeParse(input),
};
