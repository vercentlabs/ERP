import { bankAccountsCreateSchema, bankAccountsListSchema, bankAccountsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => bankAccountsCreateSchema.safeParse(input),
  update: (input: unknown) => bankAccountsUpdateSchema.safeParse(input),
  list: (input: unknown) => bankAccountsListSchema.safeParse(input),
};
