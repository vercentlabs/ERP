import { accountsPayableCreateSchema, accountsPayableListSchema, accountsPayableUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => accountsPayableCreateSchema.safeParse(input),
  update: (input: unknown) => accountsPayableUpdateSchema.safeParse(input),
  list: (input: unknown) => accountsPayableListSchema.safeParse(input),
};
