import { subLedgersCreateSchema, subLedgersListSchema, subLedgersUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => subLedgersCreateSchema.safeParse(input),
  update: (input: unknown) => subLedgersUpdateSchema.safeParse(input),
  list: (input: unknown) => subLedgersListSchema.safeParse(input),
};
