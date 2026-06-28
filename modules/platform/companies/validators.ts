import { companiesCreateSchema, companiesListSchema, companiesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => companiesCreateSchema.safeParse(input),
  update: (input: unknown) => companiesUpdateSchema.safeParse(input),
  list: (input: unknown) => companiesListSchema.safeParse(input),
};
