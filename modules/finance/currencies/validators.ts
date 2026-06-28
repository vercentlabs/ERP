import { currenciesCreateSchema, currenciesListSchema, currenciesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => currenciesCreateSchema.safeParse(input),
  update: (input: unknown) => currenciesUpdateSchema.safeParse(input),
  list: (input: unknown) => currenciesListSchema.safeParse(input),
};
