import { sparePartsCreateSchema, sparePartsListSchema, sparePartsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => sparePartsCreateSchema.safeParse(input),
  update: (input: unknown) => sparePartsUpdateSchema.safeParse(input),
  list: (input: unknown) => sparePartsListSchema.safeParse(input),
};
