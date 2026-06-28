import { accountingPeriodsCreateSchema, accountingPeriodsListSchema, accountingPeriodsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => accountingPeriodsCreateSchema.safeParse(input),
  update: (input: unknown) => accountingPeriodsUpdateSchema.safeParse(input),
  list: (input: unknown) => accountingPeriodsListSchema.safeParse(input),
};
