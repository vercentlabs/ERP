import { exchangeRatesCreateSchema, exchangeRatesListSchema, exchangeRatesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => exchangeRatesCreateSchema.safeParse(input),
  update: (input: unknown) => exchangeRatesUpdateSchema.safeParse(input),
  list: (input: unknown) => exchangeRatesListSchema.safeParse(input),
};
