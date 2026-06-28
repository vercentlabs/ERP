import { productsCreateSchema, productsListSchema, productsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => productsCreateSchema.safeParse(input),
  update: (input: unknown) => productsUpdateSchema.safeParse(input),
  list: (input: unknown) => productsListSchema.safeParse(input),
};
