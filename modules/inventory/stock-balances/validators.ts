import { stockBalancesCreateSchema, stockBalancesListSchema, stockBalancesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => stockBalancesCreateSchema.safeParse(input),
  update: (input: unknown) => stockBalancesUpdateSchema.safeParse(input),
  list: (input: unknown) => stockBalancesListSchema.safeParse(input),
};
