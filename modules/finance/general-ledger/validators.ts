import { generalLedgerCreateSchema, generalLedgerListSchema, generalLedgerUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => generalLedgerCreateSchema.safeParse(input),
  update: (input: unknown) => generalLedgerUpdateSchema.safeParse(input),
  list: (input: unknown) => generalLedgerListSchema.safeParse(input),
};
