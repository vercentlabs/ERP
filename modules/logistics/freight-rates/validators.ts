import { freightRatesCreateSchema, freightRatesListSchema, freightRatesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => freightRatesCreateSchema.safeParse(input),
  update: (input: unknown) => freightRatesUpdateSchema.safeParse(input),
  list: (input: unknown) => freightRatesListSchema.safeParse(input),
};
