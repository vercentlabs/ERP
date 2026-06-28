import { supplierScorecardsCreateSchema, supplierScorecardsListSchema, supplierScorecardsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => supplierScorecardsCreateSchema.safeParse(input),
  update: (input: unknown) => supplierScorecardsUpdateSchema.safeParse(input),
  list: (input: unknown) => supplierScorecardsListSchema.safeParse(input),
};
