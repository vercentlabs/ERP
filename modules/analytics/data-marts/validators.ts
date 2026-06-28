import { dataMartsCreateSchema, dataMartsListSchema, dataMartsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => dataMartsCreateSchema.safeParse(input),
  update: (input: unknown) => dataMartsUpdateSchema.safeParse(input),
  list: (input: unknown) => dataMartsListSchema.safeParse(input),
};
