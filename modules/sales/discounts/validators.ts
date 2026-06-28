import { discountsCreateSchema, discountsListSchema, discountsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => discountsCreateSchema.safeParse(input),
  update: (input: unknown) => discountsUpdateSchema.safeParse(input),
  list: (input: unknown) => discountsListSchema.safeParse(input),
};
