import { stockLedgerCreateSchema, stockLedgerListSchema, stockLedgerUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => stockLedgerCreateSchema.safeParse(input),
  update: (input: unknown) => stockLedgerUpdateSchema.safeParse(input),
  list: (input: unknown) => stockLedgerListSchema.safeParse(input),
};
