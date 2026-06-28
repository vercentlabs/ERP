import { variantsCreateSchema, variantsListSchema, variantsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => variantsCreateSchema.safeParse(input),
  update: (input: unknown) => variantsUpdateSchema.safeParse(input),
  list: (input: unknown) => variantsListSchema.safeParse(input),
};
