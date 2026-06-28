import { searchCreateSchema, searchListSchema, searchUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => searchCreateSchema.safeParse(input),
  update: (input: unknown) => searchUpdateSchema.safeParse(input),
  list: (input: unknown) => searchListSchema.safeParse(input),
};
