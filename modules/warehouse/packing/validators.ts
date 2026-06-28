import { packingCreateSchema, packingListSchema, packingUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => packingCreateSchema.safeParse(input),
  update: (input: unknown) => packingUpdateSchema.safeParse(input),
  list: (input: unknown) => packingListSchema.safeParse(input),
};
