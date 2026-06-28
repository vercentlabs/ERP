import { supplierQuotationsCreateSchema, supplierQuotationsListSchema, supplierQuotationsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => supplierQuotationsCreateSchema.safeParse(input),
  update: (input: unknown) => supplierQuotationsUpdateSchema.safeParse(input),
  list: (input: unknown) => supplierQuotationsListSchema.safeParse(input),
};
