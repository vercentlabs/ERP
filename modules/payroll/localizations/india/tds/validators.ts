import { localizationsIndiaTdsCreateSchema, localizationsIndiaTdsListSchema, localizationsIndiaTdsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => localizationsIndiaTdsCreateSchema.safeParse(input),
  update: (input: unknown) => localizationsIndiaTdsUpdateSchema.safeParse(input),
  list: (input: unknown) => localizationsIndiaTdsListSchema.safeParse(input),
};
