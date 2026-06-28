import { accountsReceivableCreateSchema, accountsReceivableListSchema, accountsReceivableUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => accountsReceivableCreateSchema.safeParse(input),
  update: (input: unknown) => accountsReceivableUpdateSchema.safeParse(input),
  list: (input: unknown) => accountsReceivableListSchema.safeParse(input),
};
