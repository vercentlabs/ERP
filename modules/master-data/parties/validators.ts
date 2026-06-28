import { partiesCreateSchema, partiesListSchema, partiesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => partiesCreateSchema.safeParse(input),
  update: (input: unknown) => partiesUpdateSchema.safeParse(input),
  list: (input: unknown) => partiesListSchema.safeParse(input),
};
