import { priceBooksCreateSchema, priceBooksListSchema, priceBooksUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => priceBooksCreateSchema.safeParse(input),
  update: (input: unknown) => priceBooksUpdateSchema.safeParse(input),
  list: (input: unknown) => priceBooksListSchema.safeParse(input),
};
