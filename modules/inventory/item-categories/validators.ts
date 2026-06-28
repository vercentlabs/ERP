import { itemCategoriesCreateSchema, itemCategoriesListSchema, itemCategoriesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => itemCategoriesCreateSchema.safeParse(input),
  update: (input: unknown) => itemCategoriesUpdateSchema.safeParse(input),
  list: (input: unknown) => itemCategoriesListSchema.safeParse(input),
};
