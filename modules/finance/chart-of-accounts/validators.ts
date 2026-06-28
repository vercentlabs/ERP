import { chartOfAccountsCreateSchema, chartOfAccountsListSchema, chartOfAccountsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => chartOfAccountsCreateSchema.safeParse(input),
  update: (input: unknown) => chartOfAccountsUpdateSchema.safeParse(input),
  list: (input: unknown) => chartOfAccountsListSchema.safeParse(input),
};
