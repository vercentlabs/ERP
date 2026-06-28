import { purchaseReturnsCreateSchema, purchaseReturnsListSchema, purchaseReturnsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => purchaseReturnsCreateSchema.safeParse(input),
  update: (input: unknown) => purchaseReturnsUpdateSchema.safeParse(input),
  list: (input: unknown) => purchaseReturnsListSchema.safeParse(input),
};
