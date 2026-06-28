import { localizationsIndiaPfCreateSchema, localizationsIndiaPfListSchema, localizationsIndiaPfUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => localizationsIndiaPfCreateSchema.safeParse(input),
  update: (input: unknown) => localizationsIndiaPfUpdateSchema.safeParse(input),
  list: (input: unknown) => localizationsIndiaPfListSchema.safeParse(input),
};
