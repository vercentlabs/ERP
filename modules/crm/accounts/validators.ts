import { accountsCreateSchema, accountsListSchema, accountsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => accountsCreateSchema.safeParse(input),
  update: (input: unknown) => accountsUpdateSchema.safeParse(input),
  list: (input: unknown) => accountsListSchema.safeParse(input),
};
