import { carbonAccountingCreateSchema, carbonAccountingListSchema, carbonAccountingUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => carbonAccountingCreateSchema.safeParse(input),
  update: (input: unknown) => carbonAccountingUpdateSchema.safeParse(input),
  list: (input: unknown) => carbonAccountingListSchema.safeParse(input),
};
